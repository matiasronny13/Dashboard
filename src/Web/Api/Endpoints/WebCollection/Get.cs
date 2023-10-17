using Application.WebCollection;
using FastEndpoints;
using System.Transactions;

namespace Api.Endpoints.WebCollection
{
    internal class Get : Endpoint<Get.RequestDto, Get.ResponseDto, Get.DtoMapper>
    {
        public required IWebTagService AppService { get; init; }
        public override void Configure()
        {
            Get("/collection/{hash}");
            AllowAnonymous();
        }
        public override async Task HandleAsync(Get.RequestDto request, CancellationToken ct)
        {
            var result = await AppService!.GetAsync(request.Hash);

            if (result != null)
            {
                await SendOkAsync(Map.FromEntity(result));
            }
            else
            {
                await SendNotFoundAsync(ct);
            }
        }

        #region Internal Classes
        internal class RequestDto
        {
            [BindFrom("hash")]
            public string Hash { get; set; } = String.Empty;
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
