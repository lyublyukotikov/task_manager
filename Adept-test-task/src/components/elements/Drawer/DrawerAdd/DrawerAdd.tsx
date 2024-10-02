import React, { useRef, useState } from 'react';
import useOutsideClick from '../../../../hooks/useOutsideClick';
import ModalTemplate from '../ModalTemplate/ModalTemplate';
import taskStore from '../../../../../store/TaskStore';
import { CreateTaskDto } from '../../../../../models/createtask';
import { observer } from 'mobx-react-lite';
import { DrawerAddProps } from '../../../../../models/draweradd';
import styles from './DrawerAdd.module.scss';

// Оберните ваш компонент в observer
const DrawerAdd: React.FC<DrawerAddProps> = observer(({ closeAddModal }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  useOutsideClick(drawerRef, closeAddModal);

  const handleAddTask = async () => {
    if (!eventDate || !eventDescription) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    // Удалена проверка на просроченные задачи

    const newTask: CreateTaskDto = {
      name: eventDescription,
      dueDate: new Date(eventDate).toISOString(),
      completed: false,
    };

    try {
      await taskStore.addTask(newTask);
      setEventDate('');
      setEventDescription('');
      setError(null);
      closeAddModal();
    } catch {
      setError('Ошибка при добавлении задачи.');
    }
  };

  return (
    <ModalTemplate
      drawerRef={drawerRef}
      handleCloseModal={closeAddModal}
      title="Добавление задач"
    >
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="eventDate" className={styles.label}>
            Дата мероприятия
          </label>
          <input
            type="date"
            id="eventDate"
            className={styles.inputDate}
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="eventDescription" className={styles.label}>
            Описание мероприятия
          </label>
          <textarea
            id="eventDescription"
            className={styles.textarea}
            rows={5}
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            placeholder="Введите описание задачи..."
            required
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddTask}
          >
            Добавить задачу
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={closeAddModal}
          >
            Отменить
          </button>
        </div>
      </form>
    </ModalTemplate>
  );
});

export default DrawerAdd;
