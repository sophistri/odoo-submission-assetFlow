namespace AssetFlow.Api.Dtos.Assets;

public class AssetDetailDto
{
    public int Id { get; set; }
    public string AssetTag { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int CategoryId { get; set; }
    public string? CategoryName { get; set; }
    public string? SerialNumber { get; set; }
    public DateTime? AcquisitionDate { get; set; }
    public decimal? AcquisitionCost { get; set; }
    public string? Condition { get; set; }
    public string? Location { get; set; }
    public int? DepartmentId { get; set; }
    public string? DepartmentName { get; set; }
    public string Status { get; set; } = string.Empty;
    public bool IsBookable { get; set; }
    public List<AssetAttachmentDto> Attachments { get; set; } = new();
    public List<AssetHistoryDto> History { get; set; } = new();
}