namespace API.Entities;

public class User
{
    public int Id { get; set; }
    public required string UserName { get; set; }
    public byte[] PasswordHash { get; set; } = [];
    public byte[] PasswordSalt { get; set; } = [];
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime LastActive { get; set; } = DateTime.Now;
    public double? Rating { get; set; }
    public string? About { get; set; }
    public List<Photo> ProfilePhotos { get; set; } = [];
    public List<Offer> Offers { get; set; } = [];
}
