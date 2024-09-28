using Application.WebCollection;
using FastEndpoints;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Api.Endpoints.WebCollection.Tag
{
    internal class Delete: Endpoint<Delete.RequestDto>
    {
        public required ITagKeyService AppService { get; init; }

        public override void Configure()
        {
            Delete("/tags/{Id}");
            AllowAnonymous();
        }
        public override async Task HandleAsync(RequestDto request, CancellationToken ct)
        {
            AppService.Delete(request.Id);
            await SendOkAsync(ct);
        }

        #region Internal Classes
        public class RequestDto
        {
            public long Id { get; set; }
        }
        #endregion
    }
}
