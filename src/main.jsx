import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// Define context with default values
export const Context = createContext({
  isAuthorized: false,
});

// AppWrapper component providing context values
const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
      <App />
    </Context.Provider>
  );
};

// Render App wrapped in BrowserRouter and AppWrapper
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>
);
