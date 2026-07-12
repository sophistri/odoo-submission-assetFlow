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
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _db;
        public CategoriesController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _db.AssetCategories
                .Select(c => new CategoryResponseDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    CustomFieldsJson = c.CustomFieldsJson
                })
                .ToListAsync();

            return Ok(ApiResponse<IEnumerable<CategoryResponseDto>>.Ok(categories));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] CreateCategoryDto req)
        {
            if (string.IsNullOrWhiteSpace(req.Name))
                return BadRequest(ApiResponse<string>.Fail("Category name is required"));

            var exists = await _db.AssetCategories.AnyAsync(c => c.Name == req.Name);
            if (exists)
                return BadRequest(ApiResponse<string>.Fail("Category already exists"));

            var category = new AssetCategory { Name = req.Name, CustomFieldsJson = req.CustomFieldsJson };
            _db.AssetCategories.Add(category);
            await _db.SaveChangesAsync();

            return Ok(ApiResponse<string>.Ok(category.Name, "Category created"));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateCategoryDto req)
        {
            var category = await _db.AssetCategories.FindAsync(id);
            if (category == null)
                return NotFound(ApiResponse<string>.Fail("Category not found"));

            category.Name = req.Name;
            category.CustomFieldsJson = req.CustomFieldsJson;
            await _db.SaveChangesAsync();

            return Ok(ApiResponse<string>.Ok(category.Name, "Category updated"));
        }
    }
}