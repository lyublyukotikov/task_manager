using Microsoft.EntityFrameworkCore;
using TaskApi.Data;
using TaskManagerAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Добавление контроллеров
builder.Services.AddControllers();

// Настройка подключения к базе данных через DataContext
builder.Services.AddDbContext<DataContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Регистрация сервиса ITasksService
builder.Services.AddScoped<ITasksService, TasksService>();

// Добавляем CORS политику, разрешающую запросы с клиента на порту 5173
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost5173",
        builder => builder.WithOrigins("http://localhost:5173") // Разрешаем запросы с указанного клиента
            .AllowAnyMethod() // Разрешаем любые методы (GET, POST и т.д.)
            .AllowAnyHeader() // Разрешаем любые заголовки
    );
});

var app = builder.Build();

// Применение миграций при старте приложения
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<DataContext>();
    db.Database.Migrate(); // Применяет все миграции
}

// Используем CORS политику в приложении
app.UseCors("AllowLocalhost5173");

// Маршрутизация контроллеров
app.MapControllers();

app.Run();
