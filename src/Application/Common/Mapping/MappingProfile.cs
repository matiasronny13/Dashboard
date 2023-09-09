using AutoMapper;

namespace Application.Common.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.Entities.WebTag, WebCollection.WebTagDto>().ReverseMap();
            CreateMap<Domain.Entities.TagKey, WebCollection.TagKeyDto>().ReverseMap();
        }
    }
}
