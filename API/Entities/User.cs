using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class User
{
    public int Id { get; set; }
    public required string UserName { get; set; }
    public byte[] PasswordHash { get; set; } = [];
    public byte[] PasswordSalt { get; set; } = [];
    [DataType(DataType.DateTime)]
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    [DataType(DataType.DateTime)]
    public DateTime LastActive { get; set; } = DateTime.Now;
    [Range(1, 5)]
    public double? Rating { get; set; }
    public string? About { get; set; }
    public List<Photo> ProfilePhotos { get; set; } = [];
}
