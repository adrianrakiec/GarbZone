using API.Entities;

namespace API.Interfaces;

public interface ITagRepository
{
    Task<List<Tag>> GetTagsById(List<int> tagIds);
}
