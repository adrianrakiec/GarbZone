using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class UserRepository(DataContext context, IMapper mapper) : IUserRepository
{
    public async Task<MemberDto?> GetMember(string username)
    {
        return await context.Users
            .Where(x => x.UserName == username)
            .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<MemberDto>> GetMembers()
    {
        return await context.Users
            .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<User?> GetUserById(int id)
    {
        return await context.Users.Include(t => t.Wallet).SingleOrDefaultAsync(t => t.Id == id);
    }

    public async Task<User?> GetUserByUsername(string username)
    {
        return await context.Users.Include(t => t.Wallet).SingleOrDefaultAsync(x => x.UserName == username);
    }

    public async Task<IEnumerable<User>> GetUsers()
    {
        return await context.Users.ToListAsync();
    }

    public async Task<bool> SaveAll()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void Update(User user)
    {
        context.Entry(user).State = EntityState.Modified;
    }

    public async Task<PagedList<MemberDto>> GetUsersByTerm(string term, UserParams userParams)
    {
        var query = context.Users
            .Where(u => u.UserName.ToLower().Contains(term.ToLower()))
            .ProjectTo<MemberDto>(mapper.ConfigurationProvider);

        return await PagedList<MemberDto>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
    }
}
