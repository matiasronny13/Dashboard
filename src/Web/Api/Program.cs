using Infrastructure;
using Application;
using Serilog;
using Api.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();

// Use Serilog
builder.Host.UseSerilog((context, configuration) => {
    configuration.ReadFrom.Configuration(context.Configuration);
        //.WriteTo.File("Logs/dashboard.log")
        //.WriteTo.Console();
});

// Add services to the container.

builder.Services.AddControllers();
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
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
