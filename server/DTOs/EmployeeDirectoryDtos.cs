namespace AssetFlow.Api.DTOs
{
    public class PromoteEmployeeDto
    {
        public int EmployeeId { get; set; }
        public string NewRole { get; set; } = string.Empty; // "DepartmentHead" or "AssetManager"
    }

    public class UpdateEmployeeStatusDto
    {
        public int EmployeeId { get; set; }
        public bool IsActive { get; set; }
    }

    public class EmployeeDirectoryResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? DepartmentName { get; set; }
        public string Role { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}