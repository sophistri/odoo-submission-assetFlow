namespace AssetFlow.Api.DTOs
{
    public class CreateCategoryDto
    {
        public string Name { get; set; } = string.Empty;
        public string? CustomFieldsJson { get; set; }
    }

    public class UpdateCategoryDto
    {
        public string Name { get; set; } = string.Empty;
        public string? CustomFieldsJson { get; set; }
    }

    public class CategoryResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? CustomFieldsJson { get; set; }
    }
}