namespace API.DTOs;

public class OfferDto
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public decimal? Price { get; set; }
    public int? ViewCount { get; set; } 
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string? Status { get; set; }
    public string? Seller { get; set; }
    public List<int>? SellerRating { get; set; }
    public string? SellerImg { get; set; }
    public List<PhotoDto>? Images { get; set; }
    public List<TagDto>? Tags { get; set; }
    public List<int>? LikedByUsers { get; set; }
}
