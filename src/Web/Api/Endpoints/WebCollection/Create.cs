using Application.WebCollection;
using FastEndpoints;

namespace Api.Endpoints.WebCollection
{
    internal class Create: Endpoint<CreateRequest, CreateResponse, CreateMapper>
    {
        public IWebTagService _appService { get; init; }

        public override void Configure()
        {
            Post("/collection");
            AllowAnonymous();
        }
        public override async Task HandleAsync(CreateRequest request, CancellationToken ct)
        {
            _appService.Create(Map.ToEntity(request));
            await SendCreatedAtAsync<WebCollection.Get>(request, new CreateResponse());
        }
    }

    internal class CreateRequest
    {
        public string Id { get; set; }
        public string? Url { get; set; }

        public string Title { get; set; }

        public int[]? Tags { get; set; }
    }

    internal class CreateResponse
    {
        public string Id { get; set; }

        public string? Url { get; set; }

        public string Title { get; set; }

        public int[]? Tags { get; set; }
    }
    internal class CreateMapper : Mapper<CreateRequest, CreateResponse, WebTagDto>
    {
        public override WebTagDto ToEntity(CreateRequest e)
        {
            return new WebTagDto()
            {
                Id = e.Id,
                Url = e.Url,
                Title = e.Title,
                Tags = e.Tags,
            };
        }
    }
}
