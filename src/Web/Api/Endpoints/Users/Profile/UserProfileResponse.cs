using Domain.Models;
using FastEndpoints;

namespace Api.Endpoints.Users.Profile
{
    public class UserProfileResponseMapper : Mapper <Api.Endpoints.Users.Profile.Request, UserProfileResponse, UserProfile>
    {
        public override UserProfileResponse FromEntity(UserProfile e)
        {
            return new UserProfileResponse() { UserProfile = e };
        }
    }

    public class UserProfileResponse
    {
        public UserProfile UserProfile { get; set; }
    }
}
