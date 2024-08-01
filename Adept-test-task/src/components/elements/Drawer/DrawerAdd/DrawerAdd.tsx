import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { addCompany } from "../../../../slices/companySlice";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import ModalTemplate from "../ModalTemplate/ModalTemplate";
// @ts-ignore
import styles from "./DrawerAdd.module.scss";

const DrawerAdd = ({ closeAddModal }) => {
  const dispatch: AppDispatch = useDispatch();
  const drawerRef = useRef<HTMLDivElement>(null);

  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [errors, setErrors] = useState<{ name?: string; address?: string }>({});

  useOutsideClick(drawerRef, closeAddModal);

  const handleAddCompany = () => {
    const newErrors: { name?: string; address?: string } = {};
    if (!companyName.trim()) {
      newErrors.name = "Название компании не может быть пустым";
    }
    if (!companyAddress.trim()) {
      newErrors.address = "Адрес компании не может быть пустым";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(addCompany({ name: companyName, address: companyAddress }));
    closeAddModal();
  };

  return (
    <ModalTemplate
      drawerRef={drawerRef}
      handleCloseModal={closeAddModal}
      title="Добавление компании"
    >
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="companyName" className={styles.formLabel}>
            Название компании:
          </label>
          <input
            id="companyName"
            type="text"
            className={styles.formInput}
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Введите название компании"
            required
          />
          {errors.name && <div className={styles.error}>{errors.name}</div>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="companyAddress" className={styles.formLabel}>
            Адрес компании:
          </label>
          <input
            id="companyAddress"
            type="text"
            className={styles.formInput}
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            placeholder="Введите адрес компании"
            required
          />
          {errors.address && (
            <div className={styles.error}>{errors.address}</div>
          )}
        </div>
        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddCompany}
          >
            Добавить
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
};

export default DrawerAdd;
