using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Feeds
{
    public class GroupService : IGroupService
    {
        private readonly IDashboardContext _db;
        public GroupService(IDashboardContext db) 
        {
            _db = db;
        }
        public async Task<IEnumerable<RssGroup>> GetGroupsAsync()
        {
            
        }
    }
}
