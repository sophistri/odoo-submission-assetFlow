using AssetFlow.Api.Data;
using AssetFlow.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace AssetFlow.Api.Services;

public class AssetService
{
    private readonly AppDbContext _db;
    private readonly IWebHostEnvironment _env;

    public AssetService(AppDbContext db, IWebHostEnvironment env)
    {
        _db = db;
        _env = env;
    }

    public async Task<string> GenerateAssetTagAsync()
    {
        var lastTag = await _db.Assets
            .OrderByDescending(a => a.Id)
            .Select(a => a.AssetTag)
            .FirstOrDefaultAsync();

        if (string.IsNullOrWhiteSpace(lastTag))
            return "AF-0001";

        var numberPart = lastTag.Replace("AF-", "");
        if (!int.TryParse(numberPart, out var number))
            number = 0;

        return $"AF-{(number + 1):D4}";
    }

    public async Task<AssetAttachment> SaveFileAsync(IFormFile file, int assetId)
    {
        var uploadsRoot = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads", "assets", assetId.ToString());
        Directory.CreateDirectory(uploadsRoot);

        var ext = Path.GetExtension(file.FileName);
        var storedName = $"{Guid.NewGuid():N}{ext}";
        var fullPath = Path.Combine(uploadsRoot, storedName);

        await using var stream = new FileStream(fullPath, FileMode.Create);
        await file.CopyToAsync(stream);

        return new AssetAttachment
        {
            AssetId = assetId,
            OriginalFileName = file.FileName,
            StoredFileName = storedName,
            FilePath = $"/uploads/assets/{assetId}/{storedName}",
            ContentType = file.ContentType
        };
    }
}