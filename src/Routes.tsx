import { Routes as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Yeeter from "./pages/Yeeter";
import Dao from "./pages/Dao";
import Proposal from "./pages/Proposal";

export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Home />} />
      <Route path="/dao" element={<Dao />} />
      <Route path="/yeeter" element={<Yeeter />} />
      <Route path="/proposal" element={<Proposal />} />
    </Router>
  );
};
