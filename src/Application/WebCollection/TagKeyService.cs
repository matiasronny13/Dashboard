using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.WebCollection
{
    public interface ITagKeyService
    {
        public void Create(TagKeyDto input);
        public void Update(TagKeyDto input);
        public Task Delete(long id);
        public Task<TagKeyDto?> GetAsync(Int64 id);
        public Task<IList<TagKeyDto>> GetAllAsync();
    }

    internal class TagKeyService : ITagKeyService
    {
        private readonly IDashboardContext _db;
        private readonly IMapper _mapper;
        private readonly IWebTagService _webTagService;

        public TagKeyService(IDashboardContext db, IMapper mapper, IWebTagService webTagService)
        {
            _mapper = mapper;
            _db = db;
            _webTagService = webTagService;
        }

        public async Task<TagKeyDto?> GetAsync(Int64 id)
        {
            return await _db.TagKeys.ProjectTo<TagKeyDto>(_mapper.ConfigurationProvider).Where(a => a.Id == id).FirstOrDefaultAsync();
        }

        public void Create(TagKeyDto input)
        {
            TagKey inputData = _mapper.Map<TagKey>(input);
            _db.TagKeys.Add(inputData);
            if(_db.SaveChanges() == 1)
            {
                _mapper.Map(inputData, input);
            }
        }
        public void Update(TagKeyDto input)
        {
            TagKey inputData = _mapper.Map<TagKey>(input);
            _db.TagKeys.Update(inputData);
            _db.SaveChanges();
        }
        public async Task Delete(long id)
        {
            try
            {
                _db.TagKeys.Remove(new TagKey() { Id = id });
                _db.SaveChanges();

                string[] itemIds = _db.WebTags.Where(w => w.Tags != null && w.Tags.Any(a => a == id)).Select(s => s.Id).ToArray();

                if(itemIds.Length > 0)
                {
                    await _webTagService.Delete(itemIds);
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                throw new Exception($"Failed to delete tag id {id}");
            }
        }
        public async Task<IList<TagKeyDto>> GetAllAsync()
        {
            return await _db.TagKeys.ProjectTo<TagKeyDto>(_mapper.ConfigurationProvider).ToListAsync();
        }
    }
}
