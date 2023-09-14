using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Serilog;

namespace Application.WebCollection
{
    public interface IWebTagService
    {
        public void Create(WebTagDto input);
        public void Update(WebTagDto input);
        public Task Delete(string[] input);
        public Task<WebTagDto?> GetAsync(string url);
        public Task<IList<WebTagDto>> GetAllAsync();
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

        private void SaveThumbnail(string thumbnailData, string fullFilePath)
        {
            string base64Data = thumbnailData.Split(',')[1];

            byte[] imageBytes = Convert.FromBase64String(base64Data);
            File.WriteAllBytes(fullFilePath, imageBytes);
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
            
            SaveThumbnail(input.ThumbnailData ?? String.Empty, Path.Combine(_options.WebCollection.ThumbnailPath, $"{input.Id}.png"));
        }
        public void Update(WebTagDto input)
        {
            WebTag inputData = _mapper.Map<WebTag>(input);
            _db.WebTags.Update(inputData);
            _db.SaveChanges();

            SaveThumbnail(input.ThumbnailData ?? String.Empty, Path.Combine(_options.WebCollection.ThumbnailPath, $"{input.Id}.png"));
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
