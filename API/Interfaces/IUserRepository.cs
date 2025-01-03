using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces;

public interface IUserRepository
{
    void Update(User user);
    Task<bool> SaveAll();
    Task<IEnumerable<User>> GetUsers();
    Task<User?> GetUserById(int id);
    Task<User?> GetUserByUsername(string username);
    Task<IEnumerable<MemberDto>> GetMembers();
    Task<MemberDto?> GetMember(string username);
    Task<PagedList<MemberDto>> GetUsersByTerm(string term, UserParams userParams);
    void AddComment(Comment comment);
}
