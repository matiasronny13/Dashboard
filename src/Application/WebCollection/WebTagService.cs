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
        public void Update(WebTagDto input);
        public void Delete();
        public Task<WebTagDto?> GetAsync(string url);
        public void GetAll();
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

        public async Task<WebTagDto?> GetAsync(string hash)
        {
            return await _db.WebTags.ProjectTo<WebTagDto>(_mapper.ConfigurationProvider).Where(a => a.Id == hash).FirstOrDefaultAsync();
        }

        public void Create(WebTagDto input)
        {
            WebTag inputData = _mapper.Map<WebTag>(input);
            _db.WebTags.Add(inputData);
            _db.SaveChanges();
        }
        public void Update(WebTagDto input)
        {
            WebTag inputData = _mapper.Map<WebTag>(input);
            _db.WebTags.Update(inputData);
            _db.SaveChanges();
        }
        public void Delete()
        {

        }
        public void GetAll()
        {

        }
    }
}
