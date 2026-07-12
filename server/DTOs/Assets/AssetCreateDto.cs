using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace AssetFlow.Api.Dtos.Assets;

public class AssetCreateDto
{
    [Required, MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [Required]
    public int CategoryId { get; set; }

    [MaxLength(100)]
    public string? SerialNumber { get; set; }

    public DateTime? AcquisitionDate { get; set; }

    public decimal? AcquisitionCost { get; set; }

    [MaxLength(100)]
    public string? Condition { get; set; }

    [MaxLength(200)]
    public string? Location { get; set; }

    public int? DepartmentId { get; set; }

    public bool IsBookable { get; set; }

    public IFormFile? File { get; set; }
}