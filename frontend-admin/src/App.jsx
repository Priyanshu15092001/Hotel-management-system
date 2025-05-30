import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage/AdminPage";
import Analytics from "./components/Analytics/Analytics";
import SeatingArrangement from "./components/SeatingArrangement/SeatingArrangement";
import Orders from "./components/Orders/Orders";
import Menu from "./components/Menu/Menu";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AdminPage />}>
            <Route path="" element={<Analytics />} />
            <Route path="tables" element={<SeatingArrangement />} />
            <Route path="orders" element={<Orders />} />
            <Route path="menu" element={<Menu />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
