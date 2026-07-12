// mostly post methods to facillitate the authentication related info between server and backed for login/signup stuff

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AssetFlow.Api.Data;
using AssetFlow.Api.DTOs;
using AssetFlow.Api.Models;
using AssetFlow.Api.Security;

namespace AssetFlow.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupRequestDto req)
        {
            if (await _db.Employees.AnyAsync(e => e.Email == req.Email))
                return BadRequest(ApiResponse<string>.Fail("Email already registered"));

            var employee = new Employee
            {
                Name = req.Name,
                Email = req.Email,
                PasswordHash = PasswordHasher.Hash(req.Password),
                Role = EmployeeRole.Employee, // signup ALWAYS creates Employee role — no self-elevation
                Status = EmployeeStatus.Active
            };

            _db.Employees.Add(employee);
            await _db.SaveChangesAsync();

            return Ok(ApiResponse<string>.Ok("Account created", "Signup successful"));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto req)
        {
            var employee = await _db.Employees.FirstOrDefaultAsync(e => e.Email == req.Email);
            if (employee == null || !PasswordHasher.Verify(req.Password, employee.PasswordHash))
                return Unauthorized(ApiResponse<string>.Fail("Invalid credentials"));

            if (employee.Status == EmployeeStatus.Inactive)
                return Unauthorized(ApiResponse<string>.Fail("Account is inactive"));

            var token = GenerateJwt(employee);

            var response = new AuthResponseDto
            {
                Token = token,
                Name = employee.Name,
                Email = employee.Email,
                Role = employee.Role.ToString()
            };

            return Ok(ApiResponse<AuthResponseDto>.Ok(response, "Login successful"));
        }

        private string GenerateJwt(Employee employee)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, employee.Id.ToString()),
                new Claim(ClaimTypes.Email, employee.Email),
                new Claim(ClaimTypes.Role, employee.Role.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(8),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}