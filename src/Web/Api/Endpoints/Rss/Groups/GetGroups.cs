using Domain.Models;
using FastEndpoints;
using Application.Rss;

namespace Api.Endpoints.Rss.Groups
{
    public class GetGroups: EndpointWithoutRequest<IEnumerable<RssGroup>>
    {
        public IGroupService groupService { get; init; }

        public override void Configure()
        {
            Get("/rss/groups");
            AllowAnonymous();
        }

        public override async Task HandleAsync(CancellationToken ct)
        {
            var d = await groupService.GetGroupsAsync();
            Response = d;
        }
    }
}
