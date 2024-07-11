import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import { ToastContainer } from 'react-toastify'
import Login from "./components/Login";
import Synth from "./components/Synth";
import Footer from "./components/Footer";
import Collection from "./components/Collection";
import Tinker from "./components/Tinker";

function App() {
  return <>

  <Router>
  <ToastContainer
  autoClose={1300}/>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/synth" element={<Synth />} />
      <Route path="auth/signup" element={<Signup />} />
      <Route path="auth/login" element={<Login />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/tinker/:synthId" element={<Tinker />} />
    </Routes>
    <Footer />
  </Router>
  
  </>
}

export default App