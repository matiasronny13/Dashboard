using Application.WebCollection;
using FastEndpoints;

namespace Api.Endpoints.WebCollection.Tag
{
    internal class Create : Endpoint<Create.RequestDto, Create.ResponseDto, Create.DtoMapper>
    {
        public required ITagKeyService AppService { get; init; }

        public override void Configure()
        {
            Post("/tags");
            AllowAnonymous();
        }
        public override async Task HandleAsync(RequestDto request, CancellationToken ct)
        {
            TagKeyDto entity = Map.ToEntity(request);
            AppService?.Create(entity);
            await SendCreatedAtAsync<Get>(new { id = entity.Id }, Map.FromEntity(entity));
        }

        #region Internal Classes
        internal class RequestDto
        {
            public string? Title { get; set; }

            public long? ParentId { get; set; }
        }

        internal class ResponseDto
        {
            public long Id { get; set; }

            public string? Title { get; set; }

            public long? ParentId { get; set; }
        }

        internal class DtoMapper : Mapper<RequestDto, ResponseDto, TagKeyDto>
        {
            public override TagKeyDto ToEntity(RequestDto e)
            {
                return new TagKeyDto()
                {
                    Title = e.Title,
                    ParentId = e.ParentId
                };
            }

            public override ResponseDto FromEntity(TagKeyDto e)
            {
                return new ResponseDto()
                {
                    Id = e.Id,
                    Title = e.Title,
                    ParentId = e.ParentId
                };
            }
        }
        #endregion
    }
}
