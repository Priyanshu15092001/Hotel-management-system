import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage/MenuPage";
import ConfirmationPage from "./pages/ConfirmationPage/ConfirmationPage";
function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <Router>
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/confirm-order" element={<ConfirmationPage/>} />
          </Routes>
        </Router>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
