namespace AssetFlow.Api.Dtos.Assets;

public class AssetHistoryDto
{
    public int Id { get; set; }
    public string Type { get; set; } = string.Empty;
    public string? FromStatus { get; set; }
    public string? ToStatus { get; set; }
    public string? Notes { get; set; }
    public DateTime ChangedAt { get; set; }
}