using Application.WebCollection;
using FastEndpoints;

namespace Api.Endpoints.WebCollection
{
    internal class Get : Endpoint<GetRequest, GetResponse, GetMapper>
    {
        public IWebTagService _appService { get; init; }
        public override void Configure()
        {
            Get("/collection/{Hash}");
            AllowAnonymous();
        }
        public override async Task HandleAsync(GetRequest request, CancellationToken ct)
        {
            var result = await _appService.GetAsync(request.Hash);
            await SendOkAsync(Map.FromEntity(result));
        }
    }
    internal class GetRequest
    {
        public string Hash { get; set; }
    }

    internal class GetResponse
    {
        public string Id { get; set; }

        public string? Url { get; set; }

        public string Title { get; set; }

        public int[]? Tags { get; set; }
    }
    internal class GetMapper: Mapper<GetRequest, GetResponse, WebTagDto>
    {
        public override GetResponse FromEntity(WebTagDto e)
        {
            return new GetResponse()
            {
                Id = e.Id,
                Url = e.Url,
                Title = e.Title,
                Tags = e.Tags,
            };
        }
    }
}
