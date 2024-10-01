import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/elements/Header/Header';
import DrawerAdd from './components/elements/Drawer/DrawerAdd/DrawerAdd';
import Home from './Pages/Home/Home';

function App() {
  const [showAddModal, setShowAddModal] = useState(false);

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const openAddDrawer = () => {
    setShowAddModal(!showAddModal);
  };

  return (
    <>
      <Header openAddDrawer={openAddDrawer} />

      {showAddModal && (
        <div
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DrawerAdd closeAddModal={closeAddModal} />
        </div>
      )}

      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
