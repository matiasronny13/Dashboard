using Application.WebCollection;
using Domain.Models;
using FastEndpoints;
using Microsoft.Extensions.Options;

namespace Api.Endpoints.WebCollection
{
    internal class Upload : Endpoint<Upload.RequestDto>
    {
        public required IWebTagService AppService { get; init; }
        public required IOptions<AppSettings> AppSettings { get; init; }

        public override void Configure()
        {
            Post("/collection/upload");
            AllowAnonymous();
        }
        public override async Task HandleAsync(RequestDto request, CancellationToken ct)
        {
            string pathWithoutExtension = Path.Combine(AppSettings.Value.WebCollection.ThumbnailPath, request.Id);
            if (request.FaviconFile?.Length > 0)
            {
                SaveThumbnail(request.FaviconFile, $"{pathWithoutExtension}.ico");
            }

            if (request.ThumbnailFile?.Length > 0)
            {
                SaveThumbnail(request.ThumbnailFile, $"{pathWithoutExtension}.png");
            }

            await SendOkAsync(ct);
        }

        private void SaveThumbnail(string thumbnailData, string fullFilePath)
        {
            string base64Data = thumbnailData.Split(',')[1];

            byte[] imageBytes = Convert.FromBase64String(base64Data);
            File.WriteAllBytes(fullFilePath, imageBytes);
        }

        #region Internal Classes
        internal class RequestDto
        {
            public string Id { get; set; }
            public string FaviconFile { get; set; }
            public string ThumbnailFile { get; set; }
        }
        #endregion
    }
}
