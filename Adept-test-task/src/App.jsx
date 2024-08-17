import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/elements/Header/Header";
import DrawerAdd from "./components/elements/Drawer/DrawerAdd/DrawerAdd";
import DrawerDelete from "./components/elements/Drawer/DrawerDelete/DrawerDelete";
import Home from "./Pages/Home/Home";

function App() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedCount, setSelectedCount] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const handleCompanySelect = (selected) => {
    setSelectedCompanies(selected);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const openAddDrawer = () => {
    setShowAddModal(!showAddModal);
  };

  const handleSelectionChange = (count) => {
    setSelectedCount(count);
  };

  const openDeleteDrawer = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  return (
    <>
      <Header
        openAddDrawer={openAddDrawer}
        openDeleteDrawer={openDeleteDrawer}
        selectedCount={selectedCount}
        toggleSelectAll={toggleSelectAll}
      />

      {showAddModal && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DrawerAdd closeAddModal={closeAddModal} />
        </div>
      )}

      {showDeleteModal && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DrawerDelete
            closeDeleteModal={closeDeleteModal}
            companies={selectedCompanies}
          />
        </div>
      )}

      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home
              onSelectionChange={handleSelectionChange}
              onClickToDelete={handleCompanySelect}
              selectAll={selectAll}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
