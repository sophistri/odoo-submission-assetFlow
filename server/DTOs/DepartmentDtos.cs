namespace AssetFlow.Api.DTOs
{
    public class CreateDepartmentDto
    {
        public string Name { get; set; } = string.Empty;
        public int? DepartmentHeadId { get; set; }
        public int? ParentDepartmentId { get; set; }
    }

    public class UpdateDepartmentDto
    {
        public string Name { get; set; } = string.Empty;
        public int? DepartmentHeadId { get; set; }
        public int? ParentDepartmentId { get; set; }
        public bool IsActive { get; set; } = true;
    }

    public class DepartmentResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? DepartmentHeadName { get; set; }
        public string? ParentDepartmentName { get; set; }
        public bool IsActive { get; set; }
    }
}