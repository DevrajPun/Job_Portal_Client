import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../main";

function Jobdetails() {
  const { isAuthorized } = useContext(Context);
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`/api/job/${id}`);
        setJob(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch job details");
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return isAuthorized ? (
    <>
      <div className="container-xxl py-5 bg-dark page-header mb-5">
        <div className="container my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">
            Job Details
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb text-uppercase">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li
                className="breadcrumb-item text-white active"
                aria-current="page"
              >
                Job Details
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="container-xxl py-4 px-5">
        <div className="row">
          <div className="col-md-5">
            <div className="d-flex gap-md-5 gap-md-3 gap-2 mb-3">
              <i className="fa-solid fa-globe fs-1 text-dark text-sm-center"></i>
              <h1 className="text-sm-center text-md-start">{job.title}</h1>
            </div>
            <h4>Job Description</h4>
            <p className="text-justify text-dark">{job.description}</p>
            <div className="my-4 d-md-flex justify-sm-center">
              <Link
                to={`/appliaction/${id}`}
                className="btn btn-outline-success px-md-4"
              >
                Apply
              </Link>
            </div>
          </div>
          <div className="col-md-3"></div>
          <div className="col-md-4">
            <p className="d-flex align-content-center gap-md-3 gap-2">
              <i className="fa-solid fa-fire"></i>
              <strong>Category:</strong> {job.category}
            </p>
            <p className="d-flex gap-md-3 gap-2">
              <i className="fa-solid fa-fire"></i>
              <strong>Country:</strong> {job.country}
            </p>
            <p className="d-flex gap-md-3 gap-2">
              <i className="fa-solid fa-fire"></i>
              <strong>City:</strong> {job.city}
            </p>
            <p className="d-flex gap-md-3 gap-2">
              <i className="fa-solid fa-fire"></i>
              <strong>Location:</strong> {job.location}
            </p>
            <p className="d-flex gap-md-3 gap-2">
              <i className="fa-solid fa-fire"></i>
              <strong>Salary:</strong>{" "}
              {job.fixedSalary || `${job.salaryFrom} - ${job.salaryTo}`}
            </p>
            <p className="d-flex gap-md-3 gap-2">
              <i className="fa-solid fa-fire"></i>
              <strong>Posted On:</strong>{" "}
              {new Date(job.jobPostedOn).toLocaleDateString()}
            </p>
            {/* <p className="d-flex gap-md-3 gap-2">
    <strong>Posted By:</strong> {job.postedBy || "Anonymous"}
  </p> */}
            <p className="d-flex gap-md-3 gap-2">
              <i className="fa-solid fa-fire"></i>
              <strong>Expired:</strong> {job.expired ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Navigate to={"/"} />
  );
}

export default Jobdetails;
