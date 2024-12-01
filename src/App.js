import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/login-component";
import Register from "./components/register-component";
import VerifyOTP from "./components/verifyotp-component";
import ConnectServer from "./components/execute-linux-component";
function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div >
          <header className="d-flex justify-content-around align-items-around p-2 bg-dark text-white">
            <h2> Linux Automations </h2>
            <div className="d-flex justify-content-end">
              <Link to="/login" className="btn btn-outline-primary me-2 ">Login</Link>
              <Link to="/register" className="btn btn-outline-success me-2">Register</Link>
            </div>     
          </header>
        </div>
        <Routes>
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