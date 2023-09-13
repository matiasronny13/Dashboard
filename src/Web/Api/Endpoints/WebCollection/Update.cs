using Application.WebCollection;
using FastEndpoints;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;

namespace Api.Endpoints.WebCollection
{
    internal class Update: Endpoint<Update.RequestDto, Update.ResponseDto, Update.DtoMapper>
    {
        public IWebTagService? AppService { get; init; }

        public override void Configure()
        {
            Put("/collection");
            AllowAnonymous();
        }
        public override async Task HandleAsync(RequestDto request, CancellationToken ct)
        {
            WebTagDto entity = Map.ToEntity(request);
            AppService?.Update(entity);
            await SendOkAsync(Map.FromEntity(entity), ct);
        }

        #region Internal Classes
        internal class RequestDto
        {
            public string? Id { get; set; }
            public string? Url { get; set; }

            public string? Title { get; set; }
            public string? Note { get; set; }

            public int[]? Tags { get; set; }
            public string? ThumbnailData { get; set; }
        }

        internal class ResponseDto
        {
            public string? Id { get; set; }

            public string? Url { get; set; }

            public string? Title { get; set; }
            public string? Note { get; set; }

            public int[]? Tags { get; set; }
        }
        internal class DtoMapper : Mapper<RequestDto, ResponseDto, WebTagDto>
        {
            public override WebTagDto ToEntity(RequestDto e)
            {
                return new WebTagDto()
                {
                    Id = e.Id,
                    Url = e.Url,
                    Title = e.Title,
                    Note = e.Note,
                    Tags = e.Tags,
                    ThumbnailData = e.ThumbnailData
                };
            }

            public override ResponseDto FromEntity(WebTagDto e)
            {
                return new ResponseDto()
                {
                    Id = e.Id,
                    Url = e.Url,
                    Title = e.Title,
                    Note = e.Note,
                    Tags = e.Tags
                };
            }
        }
        #endregion
    }
}
