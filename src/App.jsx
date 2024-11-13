import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { Context } from "./main";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home";
import Joblisting from "./jobs/Joblisting";
import Jobposting from "./jobs/Jobposting";
import Jobdetails from "./jobs/Jobdetails";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import Contact from "./components/Contact";
import NotFound from "./NotFound/NotFound";
import Postedjobs from "./jobs/Postedjobs";
import CategoryInsert from "./jobs/CategoryInsert";
import Application from "./applications/Application";
import MyApplications from "./applications/MyApplications";

function App() {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/getUser");
        setUser(response.data.data);
        // console.log(response.data.data);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/joblisting" element={<Joblisting />} />
        <Route path="/jobdetails/:id" element={<Jobdetails />} />
        <Route path="/jobposting" element={<Jobposting />} />
        <Route path="/postedjobs" element={<Postedjobs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/categoryinsert" element={<CategoryInsert />} />
        <Route path="/appliaction/:id" element={<Application />} />
        <Route path="/user's/appliactions" element={<MyApplications />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
