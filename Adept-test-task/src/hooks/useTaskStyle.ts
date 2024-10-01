import { useMemo } from 'react';
import styles from '../Pages/Home/Home.module.scss';
import { Task } from '../../models/task';

export const useTaskStyle = () => {
  return useMemo(() => {
    const today = new Date();
    // Обнуление времени у текущей даты
    today.setHours(0, 0, 0, 0);

    return (task: Task) => {
      const taskDueDate = new Date(task.dueDate);
      // Обнуление времени у даты задачи для точного сравнения только по дням
      taskDueDate.setHours(0, 0, 0, 0);

      if (task.completed) {
        return `${styles.gray} ${styles.strikethrough}`; // Стиль для выполненных задач
      } else if (taskDueDate.getTime() < today.getTime()) {
        return styles.overdue; // Стиль для просроченных задач
      } else {
        return styles.upcoming; // Стиль для будущих задач
      }
    };
  }, []);
};
