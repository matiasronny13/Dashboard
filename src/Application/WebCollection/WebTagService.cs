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
        private readonly IDashboardContext _db;
        private readonly IMapper _mapper;
        private readonly AppSettings _options;
        private readonly ILogger _logger;
        public WebTagService(IDashboardContext db, IMapper mapper, IOptions<AppSettings> options, ILogger logger)
        {
            _mapper = mapper;
            _db = db;
            _options = options.Value;
            _logger = logger;
        }

        public async Task<IList<WebTagDto>> FindAsync(WebTagFilterDto filter)
        {
            ExpressionStarter<WebTagDto> predicate = PredicateBuilder.New<WebTagDto>(true);
            IQueryable<WebTagDto> query = _db.WebTags.ProjectTo<WebTagDto>(_mapper.ConfigurationProvider);

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

            return await query.OrderBy(i => i.Title).ToListAsync();
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
                _logger.Error($"Failed to delete {filePath}");
            }
        }

        public async Task Delete(string[] input)
        {
            if(input.Count() > 0)
            {
                _db.WebTags.RemoveRange(input.Select(id => new WebTag() { Id = id }).ToArray());
                _db.SaveChanges();

                var tasks = input.Select(id => DeleteFileAsync(Path.Combine(_options.WebCollection.ThumbnailPath, $"{id}.png")));
                await Task.WhenAll(tasks);
            }
        }
        public async Task<IList<WebTagDto>> GetAllAsync()
        {
            return await _db.WebTags.ProjectTo<WebTagDto>(_mapper.ConfigurationProvider).ToListAsync();
        }
    }
}
