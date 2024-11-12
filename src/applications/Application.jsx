import React, { useContext, useState } from "react";
import { Context } from "../main";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Application() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  // Handle Application Submission
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post("/api/applying", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Reset form fields
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null); // Clear file input
      toast.success(data.message);
      navigateTo("/user's/appliactions");
    } catch (error) {
      toast.error(error.response?.data?.message || "Application failed");
    }
  };

  // Redirect unauthorized users
  if (!isAuthorized || (user && user.role === "employer")) {
    return <Navigate to="/" />;
  }

  return (
    <div className="col-md-8 mx-auto px-4">
      <h2 className="text-center my-4">Job Application Form</h2>
      <form
        onSubmit={handleApplication}
        className="shadow-lg p-4 rounded bg-light"
      >
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Full Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Cover Letter"
            rows="4"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="tel"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your Phone Number"
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Your Address"
            rows="3"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="file"
            accept=".pdf, .png, .jpg, .jpeg"
            className="form-control"
            onChange={handleFileChange}
            required
          />
          {resume && (
            <div className="mt-2 text-muted">
              <strong>File Selected:</strong> {resume.name}
            </div>
          )}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <button type="submit" className="btn btn-primary btn-lg">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}

export default Application;
