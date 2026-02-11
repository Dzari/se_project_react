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
    <header className="sticky top-0 z-50 border-b border-[#492828]/10 bg-[#ECECEC]/85 backdrop-blur supports-[backdrop-filter]:bg-[#ECECEC]/70">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 md:py-4">
        {/* Brand */}
        <Link
          to="/"
          className="group flex items-center gap-3 rounded-2xl px-2 py-1 transition hover:bg-[#492828]/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#84934A]/60"
          aria-label="Go to home"
        >
          <div className="relative">
            {/* subtle glow on hover */}
            <div className="pointer-events-none absolute -inset-2 rounded-2xl bg-gradient-to-br from-[#84934A]/25 via-transparent to-[#656D3F]/25 blur-md opacity-0 transition duration-300 group-hover:opacity-100" />
            <img
              src={logo}
              alt="WTWR Logo"
              className="relative h-9 w-auto drop-shadow-sm md:h-10"
            />
          </div>

          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-semibold tracking-wide text-[#492828]">
              WTWR
            </p>
            <p className="text-xs text-[#492828]/60">What to wear, right now</p>
          </div>
        </Link>

        {/* Date + City */}
        <p className="hidden md:block text-sm text-[#492828]/70">
          <span className="font-medium text-[#492828]">{currentDate}</span>
          <span className="text-[#492828]/40"> • </span>
          <span className="text-[#492828]/70">{weatherData?.city ?? ""}</span>
        </p>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          {/* Toggle wrapper (keeps layout consistent even if ToggleSwitch is updated later) */}
          <div className="rounded-2xl border border-[#492828]/10 bg-[#492828]/[0.03] p-1 shadow-sm shadow-black/10">
            <ToggleSwitch />
          </div>

          {/* Primary action */}
          <button
            onClick={isLoggedIn ? handleAddClick : handleLoginClick}
            type="button"
            className="inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold
                       bg-[#84934A] text-[#ECECEC]
                       shadow-sm shadow-black/15
                       transition
                       hover:-translate-y-0.5 hover:bg-[#656D3F] hover:shadow-md hover:shadow-black/20
                       active:translate-y-0 active:scale-[0.99]
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#84934A]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#ECECEC]"
          >
            {isLoggedIn ? "+ Add Clothes" : "Login"}
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              {/* Username chip */}
              <div className="hidden lg:inline-flex items-center rounded-full border border-[#492828]/10 bg-[#492828]/[0.03] px-3 py-1 text-sm text-[#492828]/80">
                {currentUser?.name}
              </div>

              {/* Avatar */}
              <Link
                to="/profile"
                className="group inline-flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#84934A]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#ECECEC]"
                aria-label="Open profile"
                title="Profile"
              >
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt="Avatar"
                    className="h-10 w-10 rounded-full object-cover ring-1 ring-[#492828]/15 transition group-hover:ring-[#84934A]/50"
                  />
                ) : (
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full
                               bg-gradient-to-br from-[#656D3F] to-[#84934A]
                               text-sm font-bold text-[#ECECEC]
                               ring-1 ring-[#492828]/15 transition group-hover:ring-[#84934A]/50"
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
                         border border-[#492828]/15 bg-[#492828]/[0.03] text-[#492828]
                         transition
                         hover:bg-[#492828]/[0.06] hover:-translate-y-0.5
                         active:translate-y-0 active:scale-[0.99]
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[#84934A]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#ECECEC]"
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
