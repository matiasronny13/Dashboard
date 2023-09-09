using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32.SafeHandles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Application.WebCollection
{
    public interface IWebTagService
    {
        public void Create(WebTagDto input);
        public void Update();
        public void Delete();
        public Task<WebTagDto> GetAsync(string url);
        public void GetAll();
    }

    public class DomainToResponseMappingProfile : Profile
    {
        public DomainToResponseMappingProfile()
        {
            CreateMap<WebTag, WebTagDto>().ReverseMap();
        }
    }

    internal class WebTagService: IWebTagService
    {
        private readonly IDashboardContext _db;
        private readonly IMapper _mapper;
        public WebTagService(IDashboardContext db, IMapper mapper)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<WebTagDto> GetAsync(string hash)
        {
            var result = await _db.WebTags.ProjectTo<WebTagDto>(_mapper.ConfigurationProvider).Where(a => a.Id == hash).FirstOrDefaultAsync();
            return result;
        }

        public void Create(WebTagDto input)
        {
            WebTag inputData = _mapper.Map<WebTag>(input);
            _db.WebTags.Update(inputData);
            _db.SaveChanges();
        }
        public void Update()
        {

        }
        public void Delete()
        {

        }
        public void GetAll()
        {

        }
    }
}
