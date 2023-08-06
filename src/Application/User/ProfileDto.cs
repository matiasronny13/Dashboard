using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.User
{
    public class ProfileDto
    {
        public int Id { get; set; }

        public string? UserName { get; set; }

        public DateTime? CreatedDate { get; set; }

        public virtual ICollection<RssGroup> RssGroups { get; set; } = new List<RssGroup>();


        private class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<UserProfile, ProfileDto>().ForMember(d => d.UserName, opt => opt.MapFrom(s => s.Name))
                                                    .ForMember(d => d.CreatedDate, opt => opt.Ignore());
                CreateMap<ProfileDto, UserProfile>().ForMember(d => d.Name, opt => opt.MapFrom(s => s.UserName));
            }
        }
    }
}
