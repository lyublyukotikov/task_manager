// store/TaskStore.ts
import { makeAutoObservable } from "mobx";
import TaskService from "../services/taskService";
import { CreateTaskDto } from "../models/createtask"; 
import { Task } from "../models/task";

class TaskStore {
  tasks: Task[] = [];
  isLoading: boolean = false; // Добавляем состояние загрузки

  constructor() {
    makeAutoObservable(this);
  }

  // Метод для получения задач с сервера
  async fetchTasks() {
    this.isLoading = true;  // Включаем индикатор загрузки
    try {
      const tasks = await TaskService.getTasks();
      this.tasks = tasks;
    } catch (error) {
      console.error("Ошибка при получении задач:", error);
    } finally {
      this.isLoading = false; // Отключаем индикатор загрузки
    }
  }

  // Метод для добавления новой задачи
  async addTask(task: CreateTaskDto) {
    this.isLoading = true;
    try {
      const newTask = await TaskService.addTask(task);
      this.tasks.push(newTask);
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    } finally {
      this.isLoading = false;
    }
  }

  // Метод для удаления задачи по ID
  async deleteTask(id: number) {
    this.isLoading = true;
    try {
      await TaskService.deleteTask(id);
      this.tasks = this.tasks.filter(task => task.id !== id);
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    } finally {
      this.isLoading = false;
    }
  }

  // Обновление статуса выполнения задачи
  async toggleCompleteTask(id: number, completed: boolean) {
    this.isLoading = true;
    try {
      const updatedTask = await TaskService.toggleCompleteTask(id, completed);
      this.tasks = this.tasks.map(task => task.id === id ? updatedTask : task);
    } catch (error) {
      console.error("Ошибка при изменении статуса задачи:", error);
    } finally {
      this.isLoading = false;
    }
  }
}

const taskStore = new TaskStore();
export default taskStore;
