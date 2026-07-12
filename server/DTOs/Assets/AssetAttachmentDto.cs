namespace AssetFlow.Api.Dtos.Assets;

public class AssetAttachmentDto
{
    public int Id { get; set; }
    public string OriginalFileName { get; set; } = string.Empty;
    public string FilePath { get; set; } = string.Empty;
    public string? ContentType { get; set; }
    public DateTime UploadedAt { get; set; }
}