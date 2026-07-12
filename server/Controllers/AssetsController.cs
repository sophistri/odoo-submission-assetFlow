using AssetFlow.Api.Data;
using AssetFlow.Api.Dtos.Assets;
using AssetFlow.Api.Models;
using AssetFlow.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AssetFlow.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AssetsController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly AssetService _assetService;

    public AssetsController(AppDbContext db, AssetService assetService)
    {
        _db = db;
        _assetService = assetService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AssetListItemDto>>> GetAll(
        [FromQuery] string? assetTag,
        [FromQuery] string? serialNumber,
        [FromQuery] int? categoryId,
        [FromQuery] string? status,
        [FromQuery] int? departmentId,
        [FromQuery] string? location,
        [FromQuery] string? qrCode)
    {
        var query = _db.Assets
            .Include(a => a.Category)
            .Include(a => a.Department)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(assetTag))
            query = query.Where(a => a.AssetTag.Contains(assetTag));

        if (!string.IsNullOrWhiteSpace(serialNumber))
            query = query.Where(a => a.SerialNumber != null && a.SerialNumber.Contains(serialNumber));

        if (!string.IsNullOrWhiteSpace(qrCode))
            query = query.Where(a => a.AssetTag == qrCode || a.SerialNumber == qrCode);

        if (categoryId.HasValue)
            query = query.Where(a => a.CategoryId == categoryId.Value);

        if (departmentId.HasValue)
            query = query.Where(a => a.DepartmentId == departmentId.Value);

        if (!string.IsNullOrWhiteSpace(location))
            query = query.Where(a => a.Location != null && a.Location.Contains(location));

        if (!string.IsNullOrWhiteSpace(status) && Enum.TryParse<AssetStatus>(status, true, out var parsed))
            query = query.Where(a => a.Status == parsed);

        var assets = await query
            .OrderByDescending(a => a.Id)
            .Select(a => new AssetListItemDto
            {
                Id = a.Id,
                AssetTag = a.AssetTag,
                Name = a.Name,
                CategoryName = a.Category != null ? a.Category.Name : null,
                SerialNumber = a.SerialNumber,
                Location = a.Location,
                DepartmentName = a.Department != null ? a.Department.Name : null,
                Status = a.Status.ToString(),
                IsBookable = a.IsBookable
            })
            .ToListAsync();

        return Ok(assets);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<AssetDetailDto>> GetById(int id)
    {
        var asset = await _db.Assets
            .Include(a => a.Category)
            .Include(a => a.Department)
            .Include(a => a.Attachments)
            .Include(a => a.History)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (asset == null) return NotFound();

        return Ok(new AssetDetailDto
        {
            Id = asset.Id,
            AssetTag = asset.AssetTag,
            Name = asset.Name,
            CategoryId = asset.CategoryId,
            CategoryName = asset.Category?.Name,
            SerialNumber = asset.SerialNumber,
            AcquisitionDate = asset.AcquisitionDate,
            AcquisitionCost = asset.AcquisitionCost,
            Condition = asset.Condition,
            Location = asset.Location,
            DepartmentId = asset.DepartmentId,
            DepartmentName = asset.Department?.Name,
            Status = asset.Status.ToString(),
            IsBookable = asset.IsBookable,
            Attachments = asset.Attachments.Select(x => new AssetAttachmentDto
            {
                Id = x.Id,
                OriginalFileName = x.OriginalFileName,
                FilePath = x.FilePath,
                ContentType = x.ContentType,
                UploadedAt = x.UploadedAt
            }).ToList(),
            History = asset.History.OrderByDescending(h => h.ChangedAt).Select(h => new AssetHistoryDto
            {
                Id = h.Id,
                Type = h.Type,
                FromStatus = h.FromStatus,
                ToStatus = h.ToStatus,
                Notes = h.Notes,
                ChangedAt = h.ChangedAt
            }).ToList()
        });
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> Create([FromForm] AssetCreateDto dto)
    {
        var tag = await _assetService.GenerateAssetTagAsync();

        var asset = new Asset
        {
            AssetTag = tag,
            Name = dto.Name,
            CategoryId = dto.CategoryId,
            SerialNumber = dto.SerialNumber,
            AcquisitionDate = dto.AcquisitionDate,
            AcquisitionCost = dto.AcquisitionCost,
            Condition = dto.Condition,
            Location = dto.Location,
            DepartmentId = dto.DepartmentId,
            IsBookable = dto.IsBookable,
            Status = AssetStatus.Available
        };

        _db.Assets.Add(asset);
        await _db.SaveChangesAsync();

        if (dto.File != null && dto.File.Length > 0)
        {
            var attachment = await _assetService.SaveFileAsync(dto.File, asset.Id);
            _db.AssetAttachments.Add(attachment);
            await _db.SaveChangesAsync();
        }

        _db.AssetHistories.Add(new AssetHistory
        {
            AssetId = asset.Id,
            Type = "Created",
            Notes = "Asset registered"
        });
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = asset.Id }, new { asset.Id, asset.AssetTag });
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> Update(int id, [FromBody] AssetUpdateDto dto)
    {
        var asset = await _db.Assets.FirstOrDefaultAsync(a => a.Id == id);
        if (asset == null) return NotFound();

        var oldStatus = asset.Status.ToString();

        asset.Name = dto.Name;
        asset.CategoryId = dto.CategoryId;
        asset.SerialNumber = dto.SerialNumber;
        asset.AcquisitionDate = dto.AcquisitionDate;
        asset.AcquisitionCost = dto.AcquisitionCost;
        asset.Condition = dto.Condition;
        asset.Location = dto.Location;
        asset.DepartmentId = dto.DepartmentId;
        asset.IsBookable = dto.IsBookable;

        if (Enum.TryParse<AssetStatus>(dto.Status, true, out var parsed))
            asset.Status = parsed;

        asset.UpdatedAt = DateTime.UtcNow;

        _db.AssetHistories.Add(new AssetHistory
        {
            AssetId = asset.Id,
            Type = "Updated",
            FromStatus = oldStatus,
            ToStatus = asset.Status.ToString(),
            Notes = "Asset details updated"
        });

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost("{id:int}/attachments")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> UploadAttachment(int id, [FromForm] IFormFile file)
    {
        var asset = await _db.Assets.FirstOrDefaultAsync(a => a.Id == id);
        if (asset == null) return NotFound();
        if (file == null || file.Length == 0) return BadRequest("File required");

        var attachment = await _assetService.SaveFileAsync(file, id);
        _db.AssetAttachments.Add(attachment);

        _db.AssetHistories.Add(new AssetHistory
        {
            AssetId = id,
            Type = "AttachmentUploaded",
            Notes = file.FileName
        });

        await _db.SaveChangesAsync();
        return Ok();
    }

    [HttpPost("{id:int}/status")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> ChangeStatus(int id, [FromBody] string status)
    {
        var asset = await _db.Assets.FirstOrDefaultAsync(a => a.Id == id);
        if (asset == null) return NotFound();

        if (!Enum.TryParse<AssetStatus>(status, true, out var parsed))
            return BadRequest("Invalid status");

        var from = asset.Status.ToString();
        asset.Status = parsed;
        asset.UpdatedAt = DateTime.UtcNow;

        _db.AssetHistories.Add(new AssetHistory
        {
            AssetId = id,
            Type = "StatusChanged",
            FromStatus = from,
            ToStatus = parsed.ToString()
        });

        await _db.SaveChangesAsync();
        return NoContent();
    }
}