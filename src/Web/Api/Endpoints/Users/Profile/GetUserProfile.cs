using Application.User;
using Domain.Models;
using System.Net;

namespace Api.Endpoints.Users.Profile
{
    public class GetUserProfile : FastEndpoints.Endpoint<Request, UserProfileResponse, UserProfileResponseMapper>
    {
        public IProfileService profileService { get; init; }
        
        public override void Configure()
        {
            Get("/user/profile/{id}");
            AllowAnonymous();
        }
        public override async Task HandleAsync(Request request, CancellationToken ct)
        {
            UserProfile result = await profileService.GetProfileByIdAsync(request.id);
            await SendOkAsync(Map.FromEntity(result), ct);
        }
    }

    public class Request
    {
        public int id { get; set; }
    }
}
