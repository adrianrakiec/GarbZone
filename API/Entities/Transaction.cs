namespace API.Entities;

public class Transaction
{
    public int Id { get; set; }
    public required decimal Amount { get; set; }
    public string Status { get; set; } = "Pending";
    public DateTime CreatedAt { get; set; } 
    public DateTime CompletedAt { get; set; }
    public User Seller { get; set; } = null!;
    public int SellerId { get; set; } 
    public User Buyer { get; set; } = null!;
    public int BuyerId { get; set; } 
    public Offer Offer { get; set; } = null!;
    public int OfferId { get; set; } 
}
