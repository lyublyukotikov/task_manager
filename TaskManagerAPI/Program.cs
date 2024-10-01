using Microsoft.EntityFrameworkCore;
using TaskApi.Data;  

var builder = WebApplication.CreateBuilder(args);

// Добавление контроллеров
builder.Services.AddControllers();

// Настройка подключения к базе данных через DataContext
builder.Services.AddDbContext<DataContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

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

// Используем CORS политику в приложении
app.UseCors("AllowLocalhost5173");

// Маршрутизация контроллеров
app.MapControllers();

app.Run();
