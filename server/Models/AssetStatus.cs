namespace AssetFlow.Api.Models;

public enum AssetStatus
{
    Available = 0,
    Allocated = 1,
    Reserved = 2,
    UnderMaintenance = 3,
    Lost = 4,
    Retired = 5,
    Disposed = 6
}