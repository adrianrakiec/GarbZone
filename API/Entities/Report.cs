namespace API.Entities;

public class Report
{
    public int Id { get; set; }
    public string? Reason { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsResolved { get; set; }
    public Offer Offer { get; set; } = null!;
    public int OfferId { get; set; } 
}
