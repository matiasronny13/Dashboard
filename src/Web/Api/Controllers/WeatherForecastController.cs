using Application.Rss;
using Domain;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly Serilog.ILogger _logger;
        private readonly IGroupService _groups;

        public WeatherForecastController(Serilog.ILogger logger, IGroupService groups)
        {
            _logger = logger;
            _groups = groups;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public async Task<IEnumerable<RssGroup>> Get()
        {
            _logger.Information("hallooooooo");
            IEnumerable<RssGroup> groups = await _groups.GetGroupsAsync();
            return groups;
        }
    }
}