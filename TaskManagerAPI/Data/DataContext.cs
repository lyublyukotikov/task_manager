using Microsoft.EntityFrameworkCore;
using TaskApi.Models;  
namespace TaskApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<TodoTask> Tasks { get; set; }  
    }
}