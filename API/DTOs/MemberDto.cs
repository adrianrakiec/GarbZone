namespace API.DTOs;

public class MemberDto
{
    public int Id { get; set; }
    public string? Username { get; set; }
    public string? Email { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime LastActive { get; set; } 
    public List<int>? Rating { get; set; }
    public string? About { get; set; }
    public string? ProfilePhotoUrl { get; set; }
    public List<OfferDto>? Offers { get; set; }
    public List<int>? LikedOffers { get; set; }
}
