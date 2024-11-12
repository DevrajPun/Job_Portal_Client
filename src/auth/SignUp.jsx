import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../main";

export default function SignUp() {
  const initialData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  };

  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const [data, setData] = useState(initialData);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/signUp", data);
      if (response.status === 201) {
        toast.success(response.data.message || "Registration successful!", {
          position: "top-right",
          duration: 2000,
        });
        setData(initialData); // Reset form data
        navigate("/"); // Redirect to home page
      } else {
        toast.error(
          response.data.message || "Registration failed. Please try again.",
          {
            position: "top-right",
            duration: 2000,
          }
        );
      }
    } catch (error) {
      // Log the error for debugging
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again.", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <div className=" col-lg-5 mx-auto py-5 d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="w-100 mw-400px mx-auto shadow-lg rounded bg-white p-4">
        <h1 className="text-center mb-4">Registration</h1>
        <form onSubmit={submitData}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={data.name}
              onChange={inputHandler}
              name="name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={data.email}
              onChange={inputHandler}
              name="email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              value={data.phone}
              onChange={inputHandler}
              name="phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={data.password}
              onChange={inputHandler}
              name="password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={data.confirmPassword}
              onChange={inputHandler}
              name="confirmPassword"
              required
            />
          </div>
          <div className="mb-3">
            <select
              id="role"
              name="role"
              className="form-select"
              value={data.role}
              onChange={inputHandler}
              required
            >
              <option value="">Select Role</option>
              <option value="user">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
