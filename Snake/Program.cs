using Snake.DAL.Interface;
using Snake.DAL.Repositories;
using Snake.Hubs;
using Snake.PostgresMigrate;

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

app.MapHub<RequestHub>("/hubs");
app.MapHub<NotificationHub>("/notification");

app.MapControllers();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Snake}/{action=Index}/{id?}");

app.Run();
