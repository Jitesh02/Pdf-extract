import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/upload");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div
          className="card p-4 shadow-lg"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h1 className="text-center mb-4">Login</h1>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                value={email}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-4">
              Submit
            </button>
            <div className="text-center mt-3">
              <p>
                Don't have an Account?{" "}
                <span
                  onClick={() => (window.location.href = "/signup")}
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  Signup
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
