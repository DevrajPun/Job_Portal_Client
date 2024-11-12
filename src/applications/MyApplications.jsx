import React, { useEffect, useState } from "react";
import axios from "axios";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch job applications
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
    <div>
      <h2>My Job Applications</h2>
      {applications.length === 0 ? (
        <p>You have not applied to any jobs yet.</p>
      ) : (
        <div className="applications-list">
          {applications.map((application) => (
            <div key={application._id} className="application-card">
              <h3>{application.jobTitle}</h3>
              <p>
                <strong>Company:</strong> {application.companyName}
              </p>
              <p>
                <strong>Applied On:</strong>{" "}
                {new Date(application.appliedOn).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {application.status || "Pending"}
              </p>
              <p>
                <strong>Location:</strong> {application.location}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
