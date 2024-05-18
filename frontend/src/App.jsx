
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import Login_Signup from './components/Login_SignUp/Login_Signup';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <Login_Signup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
