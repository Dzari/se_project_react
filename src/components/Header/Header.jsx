import { useContext } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/wtwrLogo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext, LoggedInContext } from "../../contexts/contexts";
import { getInitials } from "../../utils/constants";

export default function Header({
  handleAddClick,
  weatherData,
  handleLoginClick,
  handleSignupClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { isLoggedIn } = useContext(LoggedInContext);
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header className="sticky top-0 z-50 border-b border-[#ECECEC]/10 bg-[#492828]/85 backdrop-blur supports-[backdrop-filter]:bg-[#492828]/70">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 md:py-4 animate-fade-up">
        {/* Brand */}
        <Link
          to="/"
          className="group flex items-center gap-3 rounded-2xl px-2 py-1 transition hover:bg-[#ECECEC]/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#84934A]/70"
          aria-label="Go to home"
        >
          <div className="relative">
            {/* subtle glow on hover */}
            <div className="pointer-events-none absolute -inset-2 rounded-2xl bg-gradient-to-br from-[#84934A]/35 via-transparent to-[#656D3F]/35 blur-md opacity-0 transition duration-300 group-hover:opacity-100" />
            <img
              src={logo}
              alt="WTWR Logo"
              className="relative h-9 w-auto drop-shadow-sm md:h-10"
            />
          </div>

          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-semibold tracking-wide text-[#ECECEC]">
              WTWR
            </p>
            <p className="text-xs text-[#ECECEC]/70">What to wear, right now</p>
          </div>
        </Link>

        {/* Date + City */}
        <p className="hidden md:block text-sm text-[#ECECEC]/80">
          <span className="font-medium text-[#ECECEC]">{currentDate}</span>
          <span className="text-[#ECECEC]/60"> • </span>
          <span className="text-[#ECECEC]/80">{weatherData?.city ?? ""}</span>
        </p>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          {/* Toggle */}
          <div className="rounded-2xl border border-[#ECECEC]/10 bg-[#ECECEC]/[0.04] p-1 shadow-sm shadow-black/20">
            <ToggleSwitch />
          </div>

          {/* Primary action */}
          <button
            onClick={isLoggedIn ? handleAddClick : handleLoginClick}
            type="button"
            className="inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold
                       bg-[#ECECEC] text-[#492828]
                       shadow-sm shadow-black/20
                       transition
                       hover:-translate-y-0.5 hover:bg-[#ECECEC]/90 hover:shadow-md hover:shadow-black/30
                       active:translate-y-0 active:scale-[0.99]
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#84934A]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#492828]"
          >
            {isLoggedIn ? "+ Add Clothes" : "Login"}
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              {/* Username chip (hide on very small screens) */}
              <div className="hidden lg:inline-flex items-center rounded-full border border-[#ECECEC]/10 bg-[#ECECEC]/[0.04] px-3 py-1 text-sm text-[#ECECEC]/90">
                {currentUser?.name}
              </div>

              {/* Avatar */}
              <Link
                to="/profile"
                className="group inline-flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#84934A]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#492828]"
                aria-label="Open profile"
                title="Profile"
              >
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt="Avatar"
                    className="h-10 w-10 rounded-full object-cover ring-1 ring-[#ECECEC]/20 transition
                               group-hover:ring-[#84934A]/50"
                  />
                ) : (
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full
                               bg-gradient-to-br from-[#656D3F] to-[#84934A]
                               text-sm font-bold text-[#ECECEC]
                               ring-1 ring-[#ECECEC]/20 transition group-hover:ring-[#84934A]/50"
                    aria-label="Avatar placeholder"
                  >
                    {getInitials(currentUser?.name ?? "")}
                  </div>
                )}
              </Link>
            </div>
          ) : (
            <button
              onClick={handleSignupClick}
              type="button"
              className="inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold
                         border border-[#ECECEC]/15 bg-[#ECECEC]/[0.04] text-[#ECECEC]
                         transition
                         hover:bg-[#ECECEC]/[0.08] hover:-translate-y-0.5
                         active:translate-y-0 active:scale-[0.99]
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[#84934A]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#492828]"
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
