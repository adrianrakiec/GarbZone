namespace API.Entities;

public class UserOfferLike
{
    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public int OfferId { get; set; }
    public Offer Offer { get; set; } = null!;
}
