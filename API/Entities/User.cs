namespace API.Entities;

public class User
{
    public int Id { get; set; }
    public required string UserName { get; set; }
    public required string Email { get; set; }
    public byte[] PasswordHash { get; set; } = [];
    public byte[] PasswordSalt { get; set; } = [];
    public DateTime CreatedAt { get; set; }
    public DateTime LastActive { get; set; }
    public List<int> Rating { get; set; } = [];
    public string? About { get; set; }
    public string? ProfilePhotoUrl { get; set; }
    public List<Offer> Offers { get; set; } = [];
    public List<UserOfferLike> LikedOffers { get; set; } = [];
    public List<Message> MessagesSent { get; set; } = [];
    public List<Message> MessagesReceived { get; set; } = [];
    public List<Comment> Comments { get; set; } = [];
    public Wallet? Wallet { get; set; }
}
