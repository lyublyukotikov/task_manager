import React, { ReactNode, RefObject } from "react";
// @ts-ignore
import styles from "./ModalTemplate.module.scss";

interface ModalTemplateProps {
  drawerRef: RefObject<HTMLDivElement>;
  handleCloseModal: () => void;
  title: string;
  children: ReactNode;
}

const ModalTemplate: React.FC<ModalTemplateProps> = ({
  drawerRef,
  handleCloseModal,
  title,
  children,
}) => {
  return (
    <div className={styles.drawer} ref={drawerRef}>
      <div className={styles.drawerInner}>
        <button className={styles.closeButton} onClick={handleCloseModal}>
          <span className="visually-hidden">Закрыть</span>
          &times;
        </button>
        <h2 className={styles.drawerTitle}>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default ModalTemplate;
