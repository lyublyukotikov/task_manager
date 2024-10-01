namespace TaskApi.Models
{
    public class TodoTask
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty; 
        public DateTime DueDate { get; set; }
        public bool Completed { get; set; }
    }
}
