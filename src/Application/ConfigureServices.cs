using Application.Rss;
using Application.User;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Application
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            // services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddScoped<IGroupService, GroupService>();
            services.AddScoped<IProfileService, ProfileService>();
            return services;
        }
    }
}
