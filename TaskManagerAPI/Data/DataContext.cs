using Microsoft.EntityFrameworkCore;
using TaskApi.Models;  // Для доступа к вашей модели TodoTask
namespace TaskApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<TodoTask> Tasks { get; set; }  // Изменено на TodoTask
    }
}