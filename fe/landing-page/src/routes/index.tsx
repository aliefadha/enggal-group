import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Brand from "../pages/Brand";
import Berita from "../pages/Berita";
import Promo from "../pages/Promo";
import Career from "../pages/Career";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />,
      <Route path="/brand" element={<Brand />} />,
      <Route path="/berita" element={<Berita />} />,
      <Route path="/promo" element={<Promo />} />,
      <Route path="/career" element={<Career />} />,
    </Routes>
  );
}
