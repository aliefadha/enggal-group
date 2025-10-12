import { useState } from "react";
import { NavLink } from "react-router";

const PRIMARY_LINKS = [
  { label: "Home", to: "/", isAnchor: false },
  { label: "Tentang", to: "/#tentang", isAnchor: true },
  { label: "Brand", to: "/#brand", isAnchor: true },
  { label: "Berita", to: "/berita", isAnchor: false },
  { label: "Promo", to: "/promo", isAnchor: false },
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const renderLink = (label: string, to: string, isAnchor: boolean) => {
    if (isAnchor) {
      return (
        <a
          key={label}
          href={to}
          className="transition-colors hover:text-[#A71D28] hover:underline"
          onClick={closeMobileMenu}
        >
          {label}
        </a>
      );
    }

    return (
      <NavLink
        key={label}
        to={to}
        className={({ isActive }) =>
          [
            "transition-colors",
            isActive ? "text-[#A71D28] underline" : "hover:text-[#A71D28] hover:underline",
          ].join(" ")
        }
        onClick={closeMobileMenu}
      >
        {label}
      </NavLink>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center px-6 ">
        <a href="/" className="flex items-center mr-auto" onClick={closeMobileMenu}>
          <img src="/images/logo_navbar.png" className="w-24" alt="Enggal Group" />
        </a>

        <nav className="hidden items-center gap-8 uppercase font-runestars lg:flex text-lg">
          {PRIMARY_LINKS.map(({ label, to, isAnchor }) => renderLink(label, to, isAnchor))}
        </nav>

        <div className="flex items-center gap-4 ml-8">
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5E5E5] lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col items-center justify-center gap-1.5">
              <span
                className={[
                  "block h-0.5 w-6 rounded-full bg-[#6E0112] transition-transform",
                  isMobileMenuOpen ? "translate-y-2 rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-0.5 w-6 rounded-full bg-[#6E0112] transition-opacity",
                  isMobileMenuOpen ? "opacity-0" : "opacity-100",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-0.5 w-6 rounded-full bg-[#6E0112] transition-transform",
                  isMobileMenuOpen ? "-translate-y-2 -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>

          <NavLink
            to="/career"
            className={({ isActive }) =>
              [
                "rounded-xl px-4 py-2 uppercase font-runestars text-sm text-[#6E0112] transition hover:underline",
                "bg-[#FFB835]",
                isActive ? "underline" : "",
              ].join(" ")
            }
            onClick={closeMobileMenu}
          >
            Career
          </NavLink>
        </div>
      </div>

      <div
        className={[
          "border-t border-[#E5E5E5] bg-white px-6 pb-6 pt-4 uppercase font-runestars transition-[max-height,opacity] duration-200 ease-in-out lg:hidden",
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 overflow-hidden opacity-0",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4">
          {PRIMARY_LINKS.map(({ label, to, isAnchor }) => renderLink(label, to, isAnchor))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
