using Newtonsoft.Json;
using System.Net;

namespace Api.Middlewares
{
    public class ExceptionDto
    {
        public required string Message { get; set; }
        public HttpStatusCode Code { get; set; }
    }
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly Serilog.ILogger _logger;

        public ExceptionHandlerMiddleware(RequestDelegate next, Serilog.ILogger logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception exception)
            {
                // log the error
                _logger.Error(exception, "error during executing {Context}", context.Request.Path.Value);
                var response = context.Response;
                response.ContentType = "application/json";

                // get the response code and message
                ExceptionDto dto = GetExceptionDto(exception);
                response.StatusCode = (int)dto.Code;
                await response.WriteAsync(JsonConvert.SerializeObject(dto));
            }
        }

        public ExceptionDto GetExceptionDto(Exception exception)
        {
             switch (exception)
            {
                case KeyNotFoundException or FileNotFoundException:
                    return new ExceptionDto() { 
                        Message = "File not found", 
                        Code = HttpStatusCode.NotFound 
                    };
                case UnauthorizedAccessException:
                    return new ExceptionDto()
                    {
                        Message = "Unauthorized access",
                        Code = HttpStatusCode.Unauthorized
                    };
                case ArgumentException or InvalidOperationException:
                    return new ExceptionDto()
                    {
                        Message = "Bad request",
                        Code = HttpStatusCode.BadRequest
                    };
                default:
                    return new ExceptionDto()
                    {
                        Message = exception.Message,
                        Code = HttpStatusCode.InternalServerError
                    };
            }
        }
    }
}

