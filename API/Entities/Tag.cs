namespace API.Entities;

public class Tag
{
    public int Id { get; set; }  
    public required string TagName { get; set; } 
    public List<Offer> Offers { get; } = [];
}
