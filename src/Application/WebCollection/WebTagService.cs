using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

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
        private readonly AppSettings _options;
        public WebTagService(IDashboardContext db, IMapper mapper, IOptions<AppSettings> options)
        {
            _mapper = mapper;
            _db = db;
            _options = options.Value;
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
        public void Delete()
        {

        }
        public void GetAll()
        {

        }
    }
}
