using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class TagRepository(DataContext context) : ITagRepository
{
    public async Task<List<Tag>> GetTagsById(List<int> tagIds)
    {
        return await context.Tags
            .Where(tag => tagIds.Contains(tag.Id))
            .ToListAsync();
    }
}
