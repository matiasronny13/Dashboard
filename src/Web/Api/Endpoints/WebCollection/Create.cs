using Application.WebCollection;
using FastEndpoints;

namespace Api.Endpoints.WebCollection
{
    internal class Create: Endpoint<Create.RequestDto, Create.ResponseDto, Create.DtoMapper>
    {
        public IWebTagService? AppService { get; init; }

        public override void Configure()
        {
            Post("/collection");
            AllowAnonymous();
        }
        public override async Task HandleAsync(RequestDto request, CancellationToken ct)
        {
            WebTagDto entity = Map.ToEntity(request);
            AppService?.Create(entity);
            await SendCreatedAtAsync<WebCollection.Get>(new { Hash = request.Id }, Map.FromEntity(entity));
        }

        #region Internal Classes
        internal class RequestDto
        {
            public string? Id { get; set; }
            public string? Url { get; set; }

            public string? Title { get; set; }
            public string? Note { get; set; }

            public int[]? Tags { get; set; }
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
                    Tags = e.Tags,
                };
            }
        }
        #endregion
    }
}
