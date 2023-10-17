using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace Application.WebCollection
{
    public interface ITagKeyService
    {
        public void Create(TagKeyDto input);
        public void Update(TagKeyDto input);
        public void Delete();
        public Task<TagKeyDto?> GetAsync(Int64 id);
        public Task<IList<TagKeyDto>> GetAllAsync();
    }

    internal class TagKeyService : ITagKeyService
    {
        private readonly IDashboardContext _db;
        private readonly IMapper _mapper;
        public TagKeyService(IDashboardContext db, IMapper mapper)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<TagKeyDto?> GetAsync(Int64 id)
        {
            return await _db.TagKeys.ProjectTo<TagKeyDto>(_mapper.ConfigurationProvider).Where(a => a.Id == id).FirstOrDefaultAsync();
        }

        public void Create(TagKeyDto input)
        {
            TagKey inputData = _mapper.Map<TagKey>(input);
            _db.TagKeys.Add(inputData);
            _db.SaveChanges();
        }
        public void Update(TagKeyDto input)
        {
            TagKey inputData = _mapper.Map<TagKey>(input);
            _db.TagKeys.Update(inputData);
            _db.SaveChanges();
        }
        public void Delete()
        {

        }
        public async Task<IList<TagKeyDto>> GetAllAsync()
        {
            return await _db.TagKeys.ProjectTo<TagKeyDto>(_mapper.ConfigurationProvider).ToListAsync();
        }
    }
}
