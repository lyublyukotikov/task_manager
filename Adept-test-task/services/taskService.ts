import { CreateTaskDto } from "./../models/createtask";
import { Task } from "../models/task";
import $api from "../src/http/index";

export default class TaskService {
  // Получение всех задач
  static async getTasks(): Promise<Task[]> {
    const response = await $api.get<Task[]>("/tasks");
    return response.data;
  }

  // Добавление новой задачи

  static async addTask(task: CreateTaskDto): Promise<Task> {
    const response = await $api.post<Task>("/tasks", task);
    return response.data;
  }
  // Удаление задачи по ID
  static async deleteTask(id: number): Promise<void> {
    await $api.delete(`/tasks/${id}`);
  }
 // Обновление статуса выполнения задачи
static async toggleCompleteTask(id: number, completed: boolean): Promise<Task> {
  const response = await $api.put<Task>(`/tasks/${id}/completed?completed=${completed}`, null, {
      headers: {
          "Content-Type": "application/json",
      },
  });
  return response.data;
}
}
