using Application.WebCollection;
using FastEndpoints;

namespace Api.Endpoints.WebCollection
{
    internal class GetTags : EndpointWithoutRequest<IEnumerable<GetTags.ResponseDto>, GetTags.DtoMapper>
    {
        public ITagKeyService? AppService { get; init; }
        public override void Configure()
        {
            Get("/tags");
            AllowAnonymous();
        }
        public override async Task HandleAsync(CancellationToken ct)
        {
            var result = await AppService!.GetAllAsync();

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
        internal class ResponseDto
        {
            public long Id { get; set; }

            public string? Title { get; set; }

            public long? ParentId { get; set; }
        }

        internal class DtoMapper : ResponseMapper<IEnumerable<ResponseDto>, IList<TagKeyDto>>
        {
            public override IEnumerable<ResponseDto> FromEntity(IList<TagKeyDto> e)
            {
                foreach(TagKeyDto i in e)
                {
                    yield return new ResponseDto()
                    {
                        Id = i.Id,
                        Title = i.Title,
                        ParentId = i.ParentId ?? 0
                    };
                }
            }
        }
        #endregion
    }
}
