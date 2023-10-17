using Domain.Models;
using Microsoft.Extensions.Options;

namespace Application.Bookmark
{
    public interface IBookmarkService
    {
        public Task DownloadFavicon(DownloadRequest request);
    }

    internal class BookmarkService : IBookmarkService
    {
        private IHttpClientFactory _httpClientFactory;
        private readonly AppSettings _options;

        public BookmarkService(IHttpClientFactory httpClientFactory, IOptions<AppSettings> options)
        {
            _httpClientFactory = httpClientFactory;
            _options = options.Value;
        }

        public async Task DownloadFavicon(DownloadRequest request)
        {
            var client = _httpClientFactory.CreateClient("HttpClient");
            var response = await client.GetAsync(request.Url);
            response.EnsureSuccessStatusCode();
            File.WriteAllBytes(Path.Combine(_options.Bookmark.FilePaths["Favicon"], request.FileName), await response.Content.ReadAsByteArrayAsync());
        }
    }

    public class DownloadRequest
    {
        public string Url { get; set; }
        public string FileName { get; set; }
    }
}
