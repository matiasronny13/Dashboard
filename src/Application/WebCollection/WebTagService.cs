using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Domain.Models;
using LinqKit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Serilog;

namespace Application.WebCollection
{
    public interface IWebTagService
    {
        void Create(WebTagDto input);
        void Update(WebTagDto input);
        Task Delete(string[] input);
        Task<WebTagDto?> GetAsync(string url);
        Task<IList<WebTagDto>> FindAsync(WebTagFilterDto filter);
    }

    internal class WebTagService: IWebTagService
    {
        public required IDashboardContext db { get; init; }
        public required IMapper mapper { get; init; }
        public required IOptions<AppSettings> options { get; init; }
        public required ILogger logger { get; init; }

        public async Task<IList<WebTagDto>> FindAsync(WebTagFilterDto filter)
        {
            ExpressionStarter<WebTagDto> predicate = PredicateBuilder.New<WebTagDto>(true);
            IQueryable<WebTagDto> query = db.WebTags.ProjectTo<WebTagDto>(mapper.ConfigurationProvider);

            if (!string.IsNullOrEmpty(filter.Query))
            {
                string lowerCaseQuery = filter.Query.ToLower();
                query = query.Where(a => a.Title.ToLower().Contains(lowerCaseQuery) || 
                                         a.Url.ToLower().Contains(lowerCaseQuery) || 
                                         a.Note.ToLower().Contains(lowerCaseQuery));
            }

            if (filter.TagFilter != null && filter.TagFilter.Count() > 0)
            {
                foreach (int tag in filter.TagFilter)
                {
                    predicate = predicate.Or(x => x.Tags.Contains(tag));
                }

                query = query.Where(predicate);
            }

            return await query.OrderByDescending(i => i.Created).ToListAsync();
        }

        public async Task<WebTagDto?> GetAsync(string hash)
        {
            return await db.WebTags.ProjectTo<WebTagDto>(mapper.ConfigurationProvider).Where(a => a.Id == hash).FirstOrDefaultAsync();
        }

        public void Create(WebTagDto input)
        {
            WebTag inputData = mapper.Map<WebTag>(input);
            db.WebTags.Add(inputData);
            db.SaveChanges();
        }
        public void Update(WebTagDto input)
        {
            WebTag inputData = mapper.Map<WebTag>(input);
            db.WebTags.Update(inputData);
            db.SaveChanges();
        }

        private async Task DeleteFileAsync(string filePath)
        {
            try
            {
                if (File.Exists(filePath))
                {
                    await Task.Run(() => File.Delete(filePath));
                }
            }
            catch (Exception ex)
            {
                logger.Error($"Failed to delete {filePath}");
            }
        }

        public async Task Delete(string[] input)
        {
            if(input.Count() > 0)
            {
                db.WebTags.RemoveRange(input.Select(id => new WebTag() { Id = id }).ToArray());
                db.SaveChanges();

                List<Task> tasks = new List<Task>();
                foreach (string id in input)
                {
                    tasks.Add(DeleteFileAsync(Path.Combine(options.Value.WebCollection.ThumbnailPath, $"{id}.png")));
                    tasks.Add(DeleteFileAsync(Path.Combine(options.Value.WebCollection.ThumbnailPath, $"{id}.ico")));
                }
                
                if(tasks.Count > 0) await Task.WhenAll(tasks);
            }
        }
        public async Task<IList<WebTagDto>> GetAllAsync()
        {
            return await db.WebTags.ProjectTo<WebTagDto>(mapper.ConfigurationProvider).ToListAsync();
        }
    }

    #region DTO
    public class WebTagDto
    {
        public string? Id { get; set; }

        public string? Url { get; set; }

        public string? Title { get; set; }

        public string? Note { get; set; }

        public int[]? Tags { get; set; }
        public DateTime? Created { get; set; }
    }
    public class WebTagFilterDto
    {
        public string? Query { get; set; }
        public int[]? TagFilter { get; set; }

        public string OrderBy { get; set; } = "Title";
        public bool IsAscending { get; set; }
    }
    #endregion
}
