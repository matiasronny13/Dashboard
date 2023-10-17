using Application.Bookmark;
using FastEndpoints;

namespace Api.Endpoints.Bookmark
{
    internal class DownloadFavicon: Endpoint<DownloadRequest>
    {
        public IBookmarkService bookmarkService { get; init; }

        public override void Configure()
        {
            Post("/bookmark/favicon/download");
            AllowAnonymous();
        }

        public override async Task<IResult> HandleAsync(DownloadRequest request, CancellationToken ct)
        {
            await bookmarkService.DownloadFavicon(request);
            return TypedResults.Ok();
        }
    }
}
