namespace API.DTOs;

public class CreteOfferDto
{
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required decimal Price { get; set; }
    public required List<IFormFile> Images { get; set; }
}
