import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import Login_Signup from './components/Login_SignUp/Login_Signup';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import Sidebar from './components/Sidebar/Sidebar';
import List from './pages/List/List';
import Pending from './pages/Pending/Pending';
import Next from './pages/Next/Next';
function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showUpdate, setUpdateList] = useState(false);
  return (
    <>
      <ToastContainer />
      {showLogin ? <Login_Signup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <hr />
        {showLogin ? <></> : <div className="app-content">
          <Sidebar />
          <Routes>
            <Route path='/add' element={<Add />}></Route>
            <Route path='/list' element={<List setUpdateList={setUpdateList} />}></Route>
            <Route path='/pending' element={<Pending />} ></Route>
            <Route path='/next' element={<Next />}></Route>
          </Routes>
        </div>}
      </div>
    </>
  )
}

export default App