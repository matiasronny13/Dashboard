using Domain.Models;
using Microsoft.Extensions.Options;

namespace Application.Bookmark
{
    public interface IBookmarkService
    {
        public Task DownloadFavicon(DownloadRequest request);
    }

    internal class BookmarkService: IBookmarkService
    {
        public required IHttpClientFactory httpClientFactory { get; init; }
        public required IOptions<AppSettings> options { get; init; }

        public async Task DownloadFavicon(DownloadRequest request)
        {
            var client = httpClientFactory.CreateClient("HttpClient");
            var response = await client.GetAsync(request.Url);
            response.EnsureSuccessStatusCode();
            File.WriteAllBytes(Path.Combine(options.Value.Bookmark.FilePaths["Favicon"], request.FileName), await response.Content.ReadAsByteArrayAsync());
        }
    }

    public class DownloadRequest
    {
        public string Url { get; set; } = "";
        public string FileName { get; set; } = "";
    }
}
