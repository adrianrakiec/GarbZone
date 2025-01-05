using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface ITagRepository
{
    Task<List<Tag>> GetTagsById(List<int> tagIds);
    Task<List<TagDto>> GetTags();
    Task<Tag?> GetTagById(int id);
    void AddTag(Tag tag);
    void RemoveTag(Tag tag);
}
