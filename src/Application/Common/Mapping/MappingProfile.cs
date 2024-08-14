using Application.Topstep;
using AutoMapper;

namespace Application.Common.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.Entities.WebTag, WebCollection.WebTagDto>().ReverseMap();
            CreateMap<Domain.Entities.TagKey, WebCollection.TagKeyDto>().ReverseMap();
            CreateMap<Domain.Entities.TopstepAccount, Topstep.AccountDto>().ForMember(dest => dest.AccountType, opt => opt.MapFrom(src => (AccountTypeEnum)src.AccountType));
        }
    }
}
