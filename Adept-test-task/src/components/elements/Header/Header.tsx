import React from 'react';
import styles from '../Header/Header.module.scss';
import { FaPlus } from 'react-icons/fa';
import { HeaderProps } from '../../../../models/openadddrawer';

const Header: React.FC<HeaderProps> = ({ openAddDrawer }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <h2 className={styles.headerTitle}>Планировщик заданий</h2>

        {/* Кнопка для добавления компаний */}
        <button className={styles.addButton} onClick={openAddDrawer}>
          <span className={styles.addIcon}>
            <FaPlus />
          </span>
          Добавить Задачу
        </button>
      </div>
    </header>
  );
};

export default Header;
