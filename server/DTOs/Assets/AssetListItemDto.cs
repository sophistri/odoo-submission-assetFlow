namespace AssetFlow.Api.Dtos.Assets;

public class AssetListItemDto
{
    public int Id { get; set; }
    public string AssetTag { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? CategoryName { get; set; }
    public string? SerialNumber { get; set; }
    public string? Location { get; set; }
    public string? DepartmentName { get; set; }
    public string Status { get; set; } = string.Empty;
    public bool IsBookable { get; set; }
}