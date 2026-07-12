using System.ComponentModel.DataAnnotations;

namespace AssetFlow.Api.Models;

public class AssetHistory
{
    public int Id { get; set; }

    public int AssetId { get; set; }
    public Asset? Asset { get; set; }

    [Required, MaxLength(50)]
    public string Type { get; set; } = string.Empty;

    [MaxLength(50)]
    public string? FromStatus { get; set; }

    [MaxLength(50)]
    public string? ToStatus { get; set; }

    [MaxLength(500)]
    public string? Notes { get; set; }

    public int? ChangedById { get; set; }
    public Employee? ChangedBy { get; set; }

    public DateTime ChangedAt { get; set; } = DateTime.UtcNow;
}