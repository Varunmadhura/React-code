import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/login-component";
import Register from "./components/register-component";
import VerifyOTP from "./components/verifyotp-component";
import ConnectServer from "./components/execute-linux-component";
import { Home } from "./components/home-component";
function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div >
          <header className="d-flex justify-content-around align-items-around p-2 bg-dark text-white">
            <Link to="/" className="text-decoration-none"><h2>Linux Automation</h2></Link>
            <div className="d-flex justify-content-end">
              <Link to="/login" className="btn btn-primary me-2 ">Login</Link>
              <Link to="/register" className="btn btn-success me-2">Register</Link>
            </div>     
          </header>
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/verifyotp" element={<VerifyOTP/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/connect" element={<ConnectServer/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;