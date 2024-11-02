namespace API.Entities;

public class Offer
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required decimal Price { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public required string Status { get; set; }
    public List<string> ImageUrls { get; set; } = [];
    public User User { get; set; } = null!;
    public int UserId { get; set; }
}
