import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Brand from "../pages/Brand";
import BrandDetail from "../pages/BrandDetail";
import Berita from "../pages/Berita";
import Promo from "../pages/Promo";
import Career from "../pages/Career";
import PromoDetail from "../pages/PromoDetail";
import BeritaDetail from "../pages/BeritaDetail";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />,
      <Route path="/brand" element={<Brand />} />,
      <Route path="/brand/:id" element={<BrandDetail />} />,
      <Route path="/berita" element={<Berita />} />,
      <Route path="/berita/:id" element={<BeritaDetail />} />,
      <Route path="/promo" element={<Promo />} />,
      <Route path="/promo/:id" element={<PromoDetail />} />,
      <Route path="/career" element={<Career />} />,
    </Routes>
  );
}
