using System.ComponentModel.DataAnnotations;

namespace AssetFlow.Api.Models;

public class Department
{
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    public int? DepartmentHeadId { get; set; }
    public Employee? DepartmentHead { get; set; }

    public int? ParentDepartmentId { get; set; }
    public Department? ParentDepartment { get; set; }

    public bool IsActive { get; set; } = true;

    public ICollection<Asset> Assets { get; set; } = new List<Asset>();
}