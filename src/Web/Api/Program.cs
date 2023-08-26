using Infrastructure;
using Application;
using Serilog;
using Api.Middlewares;
using FastEndpoints;
using FastEndpoints.Swagger;
using System.Text.Json.Serialization;
using System.Text.Json;
using Domain.Models;

ConfigureFastEndpoints();

void ConfigureFastEndpoints()
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Logging.ClearProviders();

    //Use Serilog
    builder.Host.UseSerilog((context, configuration) => configuration.ReadFrom.Configuration(context.Configuration));

    builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
    builder.Services.AddFastEndpoints();
    builder.Services.SwaggerDocument(options =>
    {
        options.DocumentSettings = s =>
        {
            s.Title = "Dashboard API";
            s.Version = "v1";
        };
    });
    builder.Services.AddInfrastructureServices(builder.Configuration);
    builder.Services.AddApplicationServices();

    WebApplication app = builder.Build();

    app.UseMiddleware<ExceptionHandlerMiddleware>();
    app.UseFastEndpoints(options => {
            options.Serializer.Options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            options.Serializer.Options.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        })
        .UseAuthorization()       
        .UseSwaggerGen();

    app.Run();
}

void ConfigureControllers()
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Logging.ClearProviders();

    // Use Serilog
    builder.Host.UseSerilog((context, configuration) => {
        configuration.ReadFrom.Configuration(context.Configuration);
        //.WriteTo.File("Logs/dashboard.log")
        //.WriteTo.Console();
    });

    // Add services to the container.

    builder.Services.AddControllers().AddJsonOptions(options => {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    builder.Services.AddApplicationServices();
    builder.Services.AddInfrastructureServices(builder.Configuration);

    var app = builder.Build();

    app.UseMiddleware<ExceptionHandlerMiddleware>();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        Microsoft.AspNetCore.Builder.SwaggerBuilderExtensions.UseSwagger(app);
        //app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}