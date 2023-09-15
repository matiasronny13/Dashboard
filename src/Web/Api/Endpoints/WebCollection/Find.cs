using Application.WebCollection;
using FastEndpoints;

namespace Api.Endpoints.WebCollection
{
    internal class Find : Endpoint<Find.RequestDto, Find.ResponseDto>
    {
        public required IWebTagService AppService { get; init; }
        public override void Configure()
        {
            Post("/collection/find");
            AllowAnonymous();
        }
        public override async Task HandleAsync(Find.RequestDto request, CancellationToken ct)
        {
            var result = await AppService!.FindAsync(request);

            await SendOkAsync(new ResponseDto() { Results = result, TotalCount = result.Count });
        }

        #region Internal Classes
        internal class RequestDto: WebTagFilterDto
        {

        }

        internal class ResponseDto
        {
            public int TotalCount { get; set; }
            public int Pageindex { get; set; }
            public IList<WebTagDto> Results { get; set; } = new List<WebTagDto>();
        }
        #endregion
    }
}
