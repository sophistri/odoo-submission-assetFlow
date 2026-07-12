using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AssetFlow.Api.Data;
using AssetFlow.Api.DTOs;
using AssetFlow.Api.Models;

namespace AssetFlow.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DepartmentsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public DepartmentsController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var departments = await _db.Departments
                .Include(d => d.DepartmentHead)
                .Include(d => d.ParentDepartment)
                .Select(d => new DepartmentResponseDto
                {
                    Id = d.Id,
                    Name = d.Name,
                    DepartmentHeadName = d.DepartmentHead != null ? d.DepartmentHead.Name : null,
                    ParentDepartmentName = d.ParentDepartment != null ? d.ParentDepartment.Name : null,
                    IsActive = d.IsActive
                })
                .ToListAsync();

            return Ok(ApiResponse<IEnumerable<DepartmentResponseDto>>.Ok(departments));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] CreateDepartmentDto req)
        {
            if (string.IsNullOrWhiteSpace(req.Name))
                return BadRequest(ApiResponse<string>.Fail("Department name is required"));

            var department = new Department
            {
                Name = req.Name,
                DepartmentHeadId = req.DepartmentHeadId,
                ParentDepartmentId = req.ParentDepartmentId,
                IsActive = true
            };

            _db.Departments.Add(department);
            await _db.SaveChangesAsync();

            return Ok(ApiResponse<string>.Ok(department.Name, "Department created"));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateDepartmentDto req)
        {
            var department = await _db.Departments.FindAsync(id);
            if (department == null)
                return NotFound(ApiResponse<string>.Fail("Department not found"));

            department.Name = req.Name;
            department.DepartmentHeadId = req.DepartmentHeadId;
            department.ParentDepartmentId = req.ParentDepartmentId;
            department.IsActive = req.IsActive;

            await _db.SaveChangesAsync();
            return Ok(ApiResponse<string>.Ok(department.Name, "Department updated"));
        }

        [HttpPatch("{id}/deactivate")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Deactivate(int id)
        {
            var department = await _db.Departments.FindAsync(id);
            if (department == null)
                return NotFound(ApiResponse<string>.Fail("Department not found"));

            department.IsActive = false;
            await _db.SaveChangesAsync();

            return Ok(ApiResponse<string>.Ok(department.Name, "Department deactivated"));
        }
    }
}