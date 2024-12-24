namespace API.Entities;

public class Wallet
{
    public int Id { get; set; } 
    public decimal Amount { get; set; } 
    public User User { get; set; } = null!;
    public int UserId { get; set; } 
}
