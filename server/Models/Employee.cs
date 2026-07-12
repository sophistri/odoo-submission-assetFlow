// the basic details that each employee should have (as according to the given problem statement)

namespace AssetFlow.Api.Models
{
    public enum EmployeeRole { Employee, DepartmentHead, AssetManager, Admin }
    public enum EmployeeStatus { Active, Inactive }

    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public int? DepartmentId { get; set; }
        public EmployeeRole Role { get; set; } = EmployeeRole.Employee;
        public EmployeeStatus Status { get; set; } = EmployeeStatus.Active;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}