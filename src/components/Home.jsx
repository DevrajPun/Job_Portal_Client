import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import Joblisting from "../jobs/Joblisting";

function Home() {
  const { isAuthorized } = useContext(Context);
  const [category, setCategory] = useState([]);

  const categoryListing = async () => {
    try {
      const response = await axios.get("/api/categoryViewAll");
      // console.log("API Response:", response.data);
      setCategory(response.data.data || []);
      // console.log("Set category data:", response.data.data || []);
    } catch (error) {
      console.log("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    categoryListing();
  }, []);

  return isAuthorized ? (
    <>
      {/* Category */}
      <div className="container-xxl py-5">
        <div className="container">
          <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
            Explore By Category
          </h1>
          <div className="row g-4">
            {category.length > 0 ? (
              category.map((item, index) => {
                // console.log("Rendering item:", item);
                return (
                  <div
                    key={index}
                    className="col-lg-3 col-sm-6 wow fadeInUp"
                    data-wow-delay="0.1s"
                  >
                    <a className="cat-item rounded p-4" href="#">
                      <div className="d-flex justify-content-center fs-1 text-primary mb-4">
                        <i className={item.icon}></i>
                      </div>
                      <h6 className=" text-center mb-4">{item.categoryName}</h6>

                      {/* <p className="mb-0">123 Vacancy</p> */}
                    </a>
                  </div>
                );
              })
            ) : (
              <p>No categories available</p>
            )}
          </div>
        </div>
      </div>
      {/* Job Listing */}
      <Joblisting />
    </>
  ) : (
    <Navigate to={"/signin"} />
  );
}

export default Home;
