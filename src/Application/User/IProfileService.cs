using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.User
{
    public interface IProfileService
    {
        Task<UserProfile> GetProfileByIdAsync(int id);
    }
}
