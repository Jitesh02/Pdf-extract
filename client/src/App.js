import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Upload from "./components/Upload";
import "./App.css";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  return token ? <Component {...rest} /> : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<PrivateRoute component={Upload} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
