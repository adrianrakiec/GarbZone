namespace API.DTOs;

public class AddRatingDto
{
    public required int Rating { get; set; }
    public string? Comment { get; set; }
}
