import { Routes as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Yeeter from "./pages/Yeeter";
import Dao from "./pages/Dao";

export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Home />} />
      <Route path="/dao" element={<Dao />} />
      <Route path="/yeeter" element={<Yeeter />} />
    </Router>
  );
};
