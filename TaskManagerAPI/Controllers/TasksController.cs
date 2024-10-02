using Microsoft.AspNetCore.Mvc;

using TaskApi.Data;
using TaskApi.Models;
using TaskManagerAPI.Services;

namespace TaskManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ITasksService _tasksService;

        public TasksController(DataContext context, ITasksService tasksService)
        {
            _context = context;
            _tasksService = tasksService;
        }

        // GET: api/tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoTask>>> GetTasks()
        {
            return Ok(await _tasksService.GetAllTasksAsync());
        }

        // GET: api/tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoTask>> GetTask(int id)
        {
            var task = await _tasksService.GetTaskByIdAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        // POST: api/tasks
        [HttpPost]
        public async Task<ActionResult<TodoTask>> PostTask(TodoTask task)
        {
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, await _tasksService.CreateTaskAsync(task));
        }

        // DELETE: api/tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            await _tasksService.DeleteTaskAsync(id);
            return NoContent();
        }

        // PUT: api/tasks/5/completed
        [HttpPut("{id}/completed")]
        public async Task<IActionResult> UpdateTaskCompletedStatus(int id, bool completed)
        {
            await _tasksService.UpdateTaskCompletedStatusAsync(id, completed);
            return Ok(new { message = "Статус задачи обновлен." });
        }
    }
}
