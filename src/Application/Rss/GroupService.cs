using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Rss
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
            return await _db.RssGroups.Include(a => a.UserProfile).ToArrayAsync();
        }
    }
}
