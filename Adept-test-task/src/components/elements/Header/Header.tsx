import React from "react";
import styles from "./Header.module.scss";
import { FaPlus } from "react-icons/fa";

function Header({
  openAddDrawer,
  openDeleteDrawer,
  selectedCount,
  toggleSelectAll,
}) {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <h2 className={styles.headerTitle}>Список компаний</h2>
        <div className={styles.actions}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkbox}
              onChange={toggleSelectAll}
            />
            Выделить всё
          </label>
        </div>
        <button className={styles.addButton} onClick={openAddDrawer}>
          <span className={styles.addIcon}>
            <FaPlus />
          </span>
          Добавить Компанию
        </button>
        {selectedCount > 0 ? (
          <div className={styles.selectedCompanies} onClick={openDeleteDrawer}>
            <span className={styles.selectedCount}>{selectedCount}</span>
            <span className={styles.selectedText}>Выбранные компании</span>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
