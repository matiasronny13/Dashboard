using Application.Rss;
using Application.User;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper;
using System.Reflection;
using Application.Bookmark;

namespace Application
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            // services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddHttpClient("HttpClient");

            services.AddScoped<IBookmarkService, BookmarkService>();
            services.AddScoped<IGroupService, GroupService>();
            services.AddScoped<IProfileService, ProfileService>();
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            return services;
        }
    }
}
