import { useEffect } from 'react';
import { observer } from 'mobx-react-lite'; // MobX Hook для отслеживания изменений
import { FaCheck, FaUndo, FaTrashAlt } from 'react-icons/fa'; // Добавляем иконку для "Отменить выполнение"
import taskStore from '../../../store/TaskStore'; // Импортируем store

// Импортируем хуки
import { useFormattedDate } from '../../hooks/useFormattedDate';
import { useTaskStyle } from '../../hooks/useTaskStyle';

import styles from './Home.module.scss';
import { Task } from '../../../models/task';

const Home = observer(() => {
  // Получение задач при загрузке компонента
  useEffect(() => {
    taskStore.fetchTasks();
  }, []);

  // Используем хук для форматирования даты
  const formatDate = useFormattedDate();

  // Используем хук для определения стиля задачи
  const getRowStyle = useTaskStyle();

  // Обработчик удаления задачи
  const handleDelete = (id: number) => {
    taskStore.deleteTask(id);
  };

  // Обработчик для изменения статуса выполнения задачи
  const handleToggleComplete = async (task: Task) => {
    await taskStore.toggleCompleteTask(task.id, !task.completed);
  };

  // Рендер задач
  return (
    <section className="section container">
      {taskStore.isLoading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.headerCell}>Время задачи</th>
                <th className={`${styles.headerCell} ${styles.tasksColumn}`}>
                  Задача
                </th>
                <th className={styles.headerCell}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {taskStore.tasks.map((task) => (
                <tr key={task.id} className={getRowStyle(task)}>
                  <td className={styles.cell}>
                    <div className={styles.dateBox}>
                      {formatDate(task.dueDate)}
                    </div>
                  </td>
                  <td className={`${styles.cell} ${styles.tasksColumn}`}>
                    {task.name}
                  </td>
                  <td className={styles.cell}>
                    <button
                      onClick={() => handleToggleComplete(task)}
                      className={`${styles.actionButton} ${
                        task.completed
                          ? styles.undoButton
                          : styles.completeButton
                      }`}
                    >
                      {task.completed ? <FaUndo /> : <FaCheck />}
                      {task.completed ? 'Отменить выполнение' : 'Выполнить'}
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                    >
                      <FaTrashAlt /> Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
});

export default Home;
