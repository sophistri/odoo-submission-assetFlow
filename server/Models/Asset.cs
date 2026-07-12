using System.ComponentModel.DataAnnotations;

namespace AssetFlow.Api.Models;

public class Asset
{
    public int Id { get; set; }

    [Required, MaxLength(20)]
    public string AssetTag { get; set; } = string.Empty;

    [Required, MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    public int CategoryId { get; set; }
    public AssetCategory? Category { get; set; }

    [MaxLength(100)]
    public string? SerialNumber { get; set; }

    public DateTime? AcquisitionDate { get; set; }

    public decimal? AcquisitionCost { get; set; }

    [MaxLength(100)]
    public string? Condition { get; set; }

    [MaxLength(200)]
    public string? Location { get; set; }

    public int? DepartmentId { get; set; }
    public Department? Department { get; set; }

    public AssetStatus Status { get; set; } = AssetStatus.Available;

    public bool IsBookable { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<AssetAttachment> Attachments { get; set; } = new List<AssetAttachment>();
    public ICollection<AssetHistory> History { get; set; } = new List<AssetHistory>();
}