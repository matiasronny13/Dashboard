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

    internal class TagKeyService: ITagKeyService
    {
        public required IDashboardContext db { get; init; }
        public required IMapper mapper { get; init; }
        public required IWebTagService webTagService { get; init; }

        public async Task<TagKeyDto?> GetAsync(Int64 id)
        {
            return await db.TagKeys.ProjectTo<TagKeyDto>(mapper.ConfigurationProvider).Where(a => a.Id == id).FirstOrDefaultAsync();
        }

        public void Create(TagKeyDto input)
        {
            TagKey inputData = mapper.Map<TagKey>(input);
            db.TagKeys.Add(inputData);
            if(db.SaveChanges() == 1)
            {
                mapper.Map(inputData, input);
            }
        }
        public void Update(TagKeyDto input)
        {
            TagKey inputData = mapper.Map<TagKey>(input);
            db.TagKeys.Update(inputData);
            db.SaveChanges();
        }
        public async Task Delete(long id)
        {
            try
            {
                db.TagKeys.Remove(new TagKey() { Id = id });
                db.SaveChanges();

                string[] itemIds = db.WebTags.Where(w => w.Tags != null && w.Tags.Any(a => a == id)).Select(s => s.Id).ToArray();

                if(itemIds.Length > 0)
                {
                    await webTagService.Delete(itemIds);
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                throw new Exception($"Failed to delete tag id {id}");
            }
        }
        public async Task<IList<TagKeyDto>> GetAllAsync()
        {
            return await db.TagKeys.ProjectTo<TagKeyDto>(mapper.ConfigurationProvider).ToListAsync();
        }
    }

    public class TagKeyDto
    {
        public long Id { get; set; }

        public string? Title { get; set; }

        public long? ParentId { get; set; }
    }
}
