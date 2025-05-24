import React,{useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage/MenuPage";
import ConfirmationPage from "./pages/ConfirmationPage/ConfirmationPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <React.Fragment>
      {isMobile ? (
        <Router>
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/confirm-order" element={<ConfirmationPage/>} />
          </Routes>
        </Router>
      ) : (
        <div className="wrapper">
          <Router>
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/confirm-order" element={<ConfirmationPage/>} />
          </Routes>
        </Router>
        </div>
      )}
      <ToastContainer
        position="top-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        autoClose={3000}
      /> 
    </React.Fragment>
  );
}

export default App;
