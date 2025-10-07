import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className="sticky top-0 bg-white flex w-full justify-between max-w-6xl mx-auto py-3">
      <div>
        <img src="/images/logo_navbar.png" className="w-24" />
      </div>
      <div className="flex gap-16 uppercase font-runestars items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#A71D28] underline"
              : "hover:text-[#A71D28] hover:underline"
          }
        >
          Home
        </NavLink>
        <a href="/#tentang" className="hover:text-[#A71D28] hover:underline">
          Tentang
        </a>
        <NavLink
          to="/brand"
          className={({ isActive }) =>
            isActive
              ? "text-[#A71D28] underline"
              : "hover:text-[#A71D28] hover:underline"
          }
        >
          Brand
        </NavLink>
        <NavLink
          to="/berita"
          className={({ isActive }) =>
            isActive
              ? "text-[#A71D28] underline"
              : "hover:text-[#A71D28] hover:underline"
          }
        >
          Berita
        </NavLink>
        <NavLink
          to="/promo"
          className={({ isActive }) =>
            isActive
              ? "text-[#A71D28] underline"
              : "hover:text-[#A71D28] hover:underline"
          }
        >
          Promo
        </NavLink>
        <NavLink
          to="/career"
          className={({ isActive }) =>
            `px-4 py-2 bg-[#FFB835] text-[#6E0112] rounded-xl ${
              isActive ? "underline" : "hover:underline"
            }`
          }
        >
          Career
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
