using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class TagRepository(DataContext context, IMapper mapper) : ITagRepository
{
    public async Task<List<Tag>> GetTagsById(List<int> tagIds)
    {
        return await context.Tags
            .Where(tag => tagIds.Contains(tag.Id))
            .ToListAsync();
    }

    public async Task<List<TagDto>> GetTags()
    {
        return await context.Tags
            .ProjectTo<TagDto>(mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public void AddTag(Tag tag)
    {
        context.Tags.Add(tag);
    }

    public void RemoveTag(Tag tag)
    {
        context.Tags.Remove(tag);
    }

    public async Task<Tag?> GetTagById(int id)
    {
        return await context.Tags.FindAsync(id);
    }
}
