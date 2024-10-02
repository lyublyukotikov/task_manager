using TaskApi.Data;
using TaskApi.Models;
using Microsoft.EntityFrameworkCore;

namespace TaskManagerAPI.Services
{
    public interface ITasksService
    {
        Task<IEnumerable<TodoTask>> GetAllTasksAsync();
        Task<TodoTask?> GetTaskByIdAsync(int id); 
        Task<TodoTask> CreateTaskAsync(TodoTask task);
        Task DeleteTaskAsync(int id);
        Task UpdateTaskCompletedStatusAsync(int id, bool completed);
    }

    public class TasksService : ITasksService
    {
        private readonly DataContext _context;

        public TasksService(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TodoTask>> GetAllTasksAsync()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<TodoTask?> GetTaskByIdAsync(int id) 
        {
            var task = await _context.Tasks.FindAsync(id);
            return task; 
        }

        public async Task<TodoTask> CreateTaskAsync(TodoTask task)
        {
            if (task.DueDate.Kind != DateTimeKind.Utc)
            {
                task.DueDate = DateTime.SpecifyKind(task.DueDate, DateTimeKind.Utc);
            }

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task DeleteTaskAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task != null)
            {
                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateTaskCompletedStatusAsync(int id, bool completed)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task != null)
            {
                task.Completed = completed;
                await _context.SaveChangesAsync();
            }
        }
    }
}
