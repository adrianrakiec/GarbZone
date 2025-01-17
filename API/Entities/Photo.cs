namespace API.Entities;

public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }
    public int OfferId { get; set; }
    public Offer Offer { get; set; } = null!;
}
