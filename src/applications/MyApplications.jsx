import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import job from "../../public/img/job.png";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("/api/applicant/getApplicants");
        setApplications(response.data.applications);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job applications:", error);
        setError("Failed to load applications. Please try again later.");
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
          My Job Applications
        </h1>
        <div
          className="tab-class text-center wow fadeInUp"
          data-wow-delay="0.3s"
        >
          <div className="tab-content">
            <div className="tab-pane fade show p-0 active">
              {applications.length === 0 ? (
                <p>You have not applied to any jobs yet.</p>
              ) : (
                applications.map((application) => {
                  const appliedDate = new Date(
                    application.appliedOn
                  ).toLocaleDateString();

                  return (
                    <div className="job-item p-4 mb-4" key={application._id}>
                      <div className="row g-4">
                        <div className="col-sm-12 col-md-8 d-flex align-items-center">
                          <img
                            className="flex-shrink-0 img-fluid border rounded"
                            src={job || "img/com-logo-1.jpg"}
                            alt={application.jobTitle}
                            style={{ width: 80, height: 80 }}
                          />
                          <div className="text-start ps-4">
                            <h5 className="mb-3">{application.jobTitle}</h5>
                            <span className="text-truncate me-3">
                              <i className="fa fa-building text-primary me-2" />
                              {application.companyName}
                            </span>
                            <span className="text-truncate me-3">
                              <i className="fa fa-map-marker-alt text-primary me-2" />
                              {application.location}
                            </span>
                            <span className="text-truncate me-3">
                              <i className="far fa-calendar-check text-primary me-2" />
                              Applied On: {appliedDate}
                            </span>
                            <span className="text-truncate me-0">
                              <i className="fas fa-info-circle text-primary me-2" />
                              Status: {application.status || "Pending"}
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                          <div className="d-flex mb-3">
                            <Link to={"#"} className="btn btn-primary">
                              Withdrawal
                            </Link>
                          </div>
                          <small className="text-truncate">
                            Application Date: {appliedDate}
                          </small>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
