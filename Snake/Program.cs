using Snake.PostgresMigrate;
using Snake.DAL.Repositories;
using Snake.DAL.Interface;
using Microsoft.AspNetCore.SignalR;
using Snake.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();


string connectionString = builder.Configuration["ConnectionString:NpgsqlConnectionString"];
PostgresMigrator.Migrate(connectionString);
builder.Services.AddScoped<ISnakeRepository, SnakeRepository>(x => new SnakeRepository(connectionString));

builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.MapHub<NotificationHub>("/hubs");

app.MapControllers();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Snake}/{action=Index}/{id?}");

app.Run();