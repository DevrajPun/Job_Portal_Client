import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";

function Postedjobs() {
  const { isAuthorized, user } = useContext(Context);
  const userId = user?.data?._id; // Access user ID safely
  const [jobs, setJobs] = useState([]);

  // Log the user ID to ensure it's being retrieved correctly
  console.log("User ID:", userId);

  const fetchJobs = async () => {
    try {
      // Use the user ID in the API request if needed
      const response = await axios.get(`/api/job/user/${userId}`);
      setJobs(response.data.data);
    } catch (error) {
      console.error("Error fetching job list:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchJobs(); // Fetch jobs only if user ID is available
    }
  }, [userId]);

  return isAuthorized ? (
    <div className="container-xxl py-5">
      <div className="container">
        <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
          Job Listing
        </h1>
        <div
          className="tab-class text-center wow fadeInUp"
          data-wow-delay="0.3s"
        >
          <div className="tab-content">
            <div className="tab-pane fade show p-0 active">
              {jobs.map((element) => {
                const postedDate = new Date(
                  element.jobPostedOn
                ).toLocaleDateString();

                return (
                  <div className="job-item p-4 mb-4" key={element._id}>
                    <div className="row g-4">
                      <div className="col-sm-12 col-md-8 d-flex align-items-center">
                        <img
                          className="flex-shrink-0 img-fluid border rounded"
                          src={element.img || "img/com-logo-1.jpg"}
                          alt={element.title}
                          style={{ width: 80, height: 80 }}
                        />
                        <div className="text-start ps-4">
                          <h5 className="mb-3">{element.title}</h5>
                          <span className="text-truncate me-3">
                            <i className="fa fa-map-marker-alt text-primary me-2" />
                            {element.location}
                          </span>
                          <span className="text-truncate me-3">
                            <i className="far fa-clock text-primary me-2" />
                            {element.category}
                          </span>
                          <span className="text-truncate me-0">
                            <i className="far fa-money-bill-alt text-primary me-2" />
                            ₹{" "}
                            {element.fixedSalary ||
                              `${element.salaryFrom} - ${element.salaryTo}`}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                        <div className="d-flex mb-3">
                          <Link
                            to={`/jobdetails/${element._id}`}
                            className="btn btn-primary"
                          >
                            For more details
                          </Link>
                        </div>
                        <small className="text-truncate">{postedDate}</small>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={"/signin"} />
  );
}

export default Postedjobs;
