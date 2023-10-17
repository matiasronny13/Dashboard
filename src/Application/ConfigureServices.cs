using Application.User;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using Application.Bookmark;
using Application.WebCollection;

namespace Application
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            // services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddHttpClient("HttpClient");

            services.AddScoped<IBookmarkService, BookmarkService>();
            services.AddScoped<IProfileService, ProfileService>();
            services.AddScoped<IWebTagService, WebTagService>();
            services.AddScoped<ITagKeyService, TagKeyService>();
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            return services;
        }
    }
}
