import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Context } from "../main";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/signIn", {
        email,
        role,
        password,
      });
      toast.success("You have logged in successfully!", {
        position: "top-right",
        duration: 2000,
      });
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again.", {
        position: "top-right",
        duration: 2000,
      });
    }
  };
  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="col-lg-4 mx-auto d-flex align-items-center justify-content-center min-vh-100 ">
      <div className="card w-100 max-w-sm mx-auto shadow-lg rounded-lg bg-white p-4">
        <div className="text-center mb-4">
          {/* Optionally, add an icon or logo here */}
        </div>
        <h1 className="text-center text-uppercase font-weight-bold mb-4">
          Sign In
        </h1>
        <form onSubmit={submitData}>
          <div className="form-group mb-4">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <select
              id="role"
              name="role"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="jobSeeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>
          <div className="form-group mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 font-weight-semibold py-2 mb-4"
          >
            Sign In
          </button>
          <p className="text-center">
            Click here for{" "}
            <Link to="/registration" className="text-primary">
              registration
            </Link>
          </p>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
