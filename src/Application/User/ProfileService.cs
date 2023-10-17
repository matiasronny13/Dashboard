using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace Application.User
{
    public interface IProfileService
    {
        Task<ProfileDto> GetProfileByIdAsync(int id);
    }

    public class ProfileService: IProfileService
    {
        private readonly IDashboardContext _db;
        private readonly IMapper _mapper;
        public ProfileService(IDashboardContext db, IMapper mapper)
        {
            _mapper = mapper;
            _db = db;
        }
        public async Task<ProfileDto> GetProfileByIdAsync(int id)
        {
            return await _db.UserProfiles.ProjectTo<ProfileDto>(_mapper.ConfigurationProvider).Where(a => a.Id == id).FirstOrDefaultAsync();
            //UserProfile result = await _db.UserProfiles.Where(a => a.Id == id).FirstOrDefaultAsync();
            //return _mapper.Map<ProfileDto>(result);
        }
    }
}
