using Application.Common.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace Application.User
{
    public class ProfileService: IProfileService
    {
        private readonly IDashboardContext _db;
        public ProfileService(IDashboardContext db)
        {
            _db = db;
        }
        public async Task<UserProfile> GetProfileByIdAsync(int id)
        {
            return await _db.UserProfiles.Include(i => i.RssGroups).Where(a => a.Id == id).FirstOrDefaultAsync();
        }
    }
}
