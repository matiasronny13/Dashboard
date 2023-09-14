using Application.WebCollection;
using FastEndpoints;

namespace Api.Endpoints.WebCollection
{
    internal class Delete: Endpoint<Delete.RequestDto>
    {
        public IWebTagService AppService { get; init; }

        public override void Configure()
        {
            Delete("/collection");
            AllowAnonymous();
        }
        public override async Task HandleAsync(RequestDto request, CancellationToken ct)
        {
            await AppService.Delete(request.Ids);
            await SendOkAsync(ct);
        }

        #region Internal Classes
        public class RequestDto
        {
            public RequestDto() 
            {
                Ids = new string[] { };
            }

            [QueryParam]
            public string[] Ids { get; set; }
        }
        #endregion
    }
}
