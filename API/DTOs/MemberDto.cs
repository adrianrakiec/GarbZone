namespace API.DTOs;

public class MemberDto
{
    public int Id { get; set; }
    public string? Username { get; set; }
    public string? PhotoUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime LastActive { get; set; } 
    public double? Rating { get; set; }
    public string? About { get; set; }
    public List<PhotoDto>? ProfilePhotos { get; set; } = [];
}
