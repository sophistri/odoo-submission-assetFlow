using System.ComponentModel.DataAnnotations;

namespace AssetFlow.Api.Models;

public class AssetCategory
{
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    public ICollection<Asset> Assets { get; set; } = new List<Asset>();
}