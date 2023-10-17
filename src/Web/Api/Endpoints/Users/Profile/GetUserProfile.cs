using Application.User;
using FastEndpoints;

namespace Api.Endpoints.Users.Profile
{
    internal class GetUserProfile : FastEndpoints.Endpoint<Request, UserProfileResponse, UserProfileResponseMapper>
    {
        public IProfileService profileService { get; init; }
        
        public override void Configure()
        {
            Get("/user/profile/{id}");
            AllowAnonymous();
        }
        public override async Task HandleAsync(Request request, CancellationToken ct)
        {
            ProfileDto result = await profileService.GetProfileByIdAsync(request.id);
            await SendOkAsync(Map.FromEntity(result), ct);
        }
    }

    internal class Request
    {
        public int id { get; set; }
    }

    internal class UserProfileResponse
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public DateTime? CreatedDate { get; set; }
    }

    internal class UserProfileResponseMapper: Mapper<Request, UserProfileResponse, ProfileDto>
    {
        public override UserProfileResponse FromEntity(ProfileDto e)
        {
            return new UserProfileResponse()
            {
                Id = e.Id,
                Name = e.UserName,
                CreatedDate = e.CreatedDate
            };
        }
    }
}
