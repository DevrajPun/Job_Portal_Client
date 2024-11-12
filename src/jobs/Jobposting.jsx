import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Jobposting() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const [categoryList, setCategoryList] = useState([]);

  const categoryListing = async () => {
    try {
      const response = await axios.get("/api/categoryViewAll");
      // console.log("API Response:", response.data);
      setCategoryList(response.data.data || []);
      // console.log("Set category data:", response.data.data || []);
    } catch (error) {
      console.log("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    categoryListing();
  }, []);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    await axios
      .post(
        "/api/jobPost",
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  if (!isAuthorized || (user && user.role !== "employer")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="container">
        <div className="col-md-8 mx-auto mt-5">
          <div className="card shadow-lg rounded-lg border-0">
            <h2 className="text-center bg-info pt-3 pb-3 text-white rounded-top">
              Post New Job
            </h2>
            <div className="card-body mb-5">
              <form action="" onSubmit={handleJobPost}>
                {/* Job Title */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Job Title
                  </label>
                  <input
                    id="title"
                    className="form-control"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter job title"
                  />
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    id="category"
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categoryList.map((item, index) => (
                      <option key={index} value={item.categoryName}>
                        {item.categoryName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Country */}
                <div className="mb-3">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <input
                    id="country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Enter country"
                    className="form-control"
                  />
                </div>

                {/* City */}
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                    className="form-control"
                  />
                </div>

                {/* Location */}
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                    className="form-control"
                  />
                </div>

                {/* Salary */}
                <div className="mb-3">
                  <label htmlFor="salaryType" className="form-label">
                    Salary
                  </label>
                  <select
                    id="salaryType"
                    className="form-select"
                    value={salaryType}
                    onChange={(e) => setSalaryType(e.target.value)}
                  >
                    <option value="default">Select Salary Type</option>
                    <option value="Fixed Salary">Fixed Salary</option>
                    <option value="Ranged Salary">Ranged Salary</option>
                  </select>

                  {/* Conditional Salary Inputs */}
                  {salaryType === "Fixed Salary" ? (
                    <div className="mt-2">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Fixed Salary"
                        value={fixedSalary}
                        onChange={(e) => setFixedSalary(e.target.value)}
                      />
                    </div>
                  ) : salaryType === "Ranged Salary" ? (
                    <div className="mt-2">
                      <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="Salary From"
                        value={salaryFrom}
                        onChange={(e) => setSalaryFrom(e.target.value)}
                      />
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Salary To"
                        value={salaryTo}
                        onChange={(e) => setSalaryTo(e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className="mt-2 text-danger">
                      Please provide Salary Type.
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a brief job description"
                  />
                </div>

                {/* Submit Button */}
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-success px-4">
                    Create Job
                  </button>
                  <Link to="/joblisting" className="btn btn-outline-primary">
                    Go to Job List
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Jobposting;
