namespace API.Entities;

public class Comment
{
    public int Id { get; set; }
    public required string Content { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public User Author { get; set; } = null!;
    public int AuthorId { get; set; } 
    public User User { get; set; } = null!;
    public int UserId { get; set; } 
    public Offer Offer { get; set; } = null!;
    public int OfferId { get; set; } 
}
