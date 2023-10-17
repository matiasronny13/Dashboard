using Domain;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly Serilog.ILogger _logger;

        public WeatherForecastController(Serilog.ILogger logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public async Task Get()
        {
            _logger.Information("hallooooooo");
        }
    }
}