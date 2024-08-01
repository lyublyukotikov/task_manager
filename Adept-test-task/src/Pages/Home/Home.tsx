import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Company } from "../../models/company";
import { HomeProps } from "../../models/homeProps";
import { useCompanies } from "../../hooks/useCompanies";
import { useSelectedCompanies } from "../../hooks/useSelectedCompanies";
// @ts-ignore
import styles from "./Home.module.scss";

const Home: React.FC<HomeProps> = ({
  onSelectionChange,
  selectAll,
  onClickToDelete,
}) => {
  const { companies, status, updateCompany } = useCompanies();
  const { selectedCompanies, handleCheckboxChange } = useSelectedCompanies(
    companies,
    selectAll,
    onSelectionChange,
    onClickToDelete
  );
  //храним в state
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editAddress, setEditAddress] = useState<string>("");

  //записываем id name address в state
  const handleEditClick = (company: Company) => {
    setEditId(company.id);
    setEditName(company.name);
    setEditAddress(company.address);
  };

  // передаем в store
  const handleSaveClick = () => {
    if (editId !== null) {
      updateCompany(editId, { name: editName, address: editAddress });
      setEditId(null);
    }
  };

  // отмена,отчищаем
  const handleCancelClick = () => {
    setEditId(null);
  };

  if (status === "loading") {
    return (
      <section className="section container">
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
        </div>
      </section>
    );
  }

  return (
    <section className="section container">
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.checkboxCell}></th>
              <th className={styles.headerCell}>Название компании</th>
              <th className={styles.headerCell}>Адрес</th>
              <th className={styles.headerCell}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company: Company) => (
              <tr
                key={company.id}
                className={`${styles.row} ${
                  selectedCompanies.includes(company.id) ? styles.selected : ""
                }`}
              >
                <td className={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    className={styles.rowCheckbox}
                    checked={selectedCompanies.includes(company.id)}
                    onChange={() => handleCheckboxChange(company.id)}
                  />
                </td>
                <td className={styles.cell}>
                  {editId === company.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    company.name
                  )}
                </td>
                <td className={styles.cell}>
                  {editId === company.id ? (
                    <input
                      type="text"
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    company.address
                  )}
                </td>
                <td className={styles.cell}>
                  {editId === company.id ? (
                    <div className={styles.containerButton}>
                      <button
                        className={styles.addButton}
                        onClick={handleSaveClick}
                      >
                        Ок
                      </button>
                      <button
                        className={styles.addButton}
                        onClick={handleCancelClick}
                      >
                        Отмена
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditClick(company)}
                      className={styles.editIcon}
                    >
                      <FaEdit />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Home;
