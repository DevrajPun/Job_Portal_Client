import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../main";

function Navbar() {
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  // State to manage navbar collapse
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get("/api/signOut");
      setIsAuthorized(false);
      navigateTo("/signin");
    } catch (error) {
      console.log("Logout Failed!", error);
    }
  };

  const toggleNavbar = () => {
    setIsNavbarOpen((prev) => !prev); // Toggle navbar state
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false); // Close navbar
  };

  return isAuthorized ? (
    <>
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5"
        >
          <h1 className="m-0 text-primary">JobEntry</h1>
        </Link>
        <button
          type="button"
          className="navbar-toggler me-4"
          onClick={toggleNavbar} // Toggle navbar on button click
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`} // Use state to control collapse
        >
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link to="/" className="nav-item nav-link" onClick={closeNavbar}>
              Home
            </Link>
            {user && user.role === "jobSeeker" && (
              <>
                <Link
                  to="/joblisting"
                  className="nav-item nav-link"
                  onClick={closeNavbar}
                >
                  Job List
                </Link>
                <Link
                  to="/appliedjobs"
                  className="nav-item nav-link"
                  onClick={closeNavbar}
                >
                  Applied Jobs
                </Link>
              </>
            )}

            {user && user.role === "employer" && (
              <>
                <Link
                  to="/jobposting"
                  className="nav-item nav-link"
                  onClick={closeNavbar}
                >
                  Post New Jobs
                </Link>
                <Link
                  to="/postedjobs"
                  className="nav-item nav-link"
                  onClick={closeNavbar}
                >
                  Posted Jobs
                </Link>
              </>
            )}

            <Link
              to="/contact"
              className="nav-item nav-link"
              onClick={closeNavbar}
            >
              Contact
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-primary rounded-0 py-4 px-lg-5 d-lg-block"
          >
            Logout
            <i className="fa fa-arrow-right ms-3" />
          </button>
        </div>
      </nav>
    </>
  ) : null;
}

export default Navbar;
