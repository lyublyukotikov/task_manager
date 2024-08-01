import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import ModalTemplate from "../ModalTemplate/ModalTemplate";
import { deleteCompanies} from "../../../../slices/companySlice";
// @ts-ignore
import styles from "./DrawerDelete.module.scss";
import { DrawerDeleteProps } from "../../../../models/drawerDeleteProps";

const DrawerDelete: React.FC<DrawerDeleteProps> = ({
  closeDeleteModal,
  companies,
}) => {
  const dispatch = useDispatch();
  const drawerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(drawerRef, closeDeleteModal);

  const handleDeleteAll = () => {
    // передаем массив id компаний для удаления
    const ids = companies.map(company => company.id);
    // @ts-ignore
    dispatch(deleteCompanies(ids)); 
    closeDeleteModal();
  };

  return (
    <ModalTemplate
      drawerRef={drawerRef}
      handleCloseModal={closeDeleteModal}
      title="Удаление компаний"
    >
      <div className={styles.companyList}>
        {companies.map((company) => (
          <div key={company.id} className={styles.companyItem}>
            <div className={styles.companyInfo}>
              <div className={styles.companyName}>{company.name}</div>
              <div className={styles.companyAddress}>{company.address}</div>
            </div>
          </div>
        ))}
        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDeleteAll}
        >
          Удалить все
        </button>
      </div>
    </ModalTemplate>
  );
};

export default DrawerDelete;
