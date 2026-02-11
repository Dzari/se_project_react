import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/contexts";
import { getInitials } from "../../utils/constants";

const SideBar = ({ onEditProfileClick, handleLogout }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const name = currentUser?.name || "User";
  const initials = getInitials(name);

  return (
    <aside
      className="
        h-fit
        rounded-2xl border border-[#492828]/10 bg-white/70 backdrop-blur
        p-4 shadow-sm shadow-black/5
        md:sticky md:top-24
      "
    >
      <div className="flex items-center gap-3">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt="Avatar"
            className="h-12 w-12 rounded-full object-cover ring-1 ring-[#492828]/15"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#656D3F] to-[#84934A] text-sm font-bold text-[#ECECEC] ring-1 ring-[#492828]/15">
            {initials}
          </div>
        )}

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#492828]">
            {name}
          </p>
          <p className="text-xs text-[#492828]/60">Profile settings</p>
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        <button
          type="button"
          onClick={onEditProfileClick}
          className="
            inline-flex w-full items-center justify-center rounded-xl
            border border-[#492828]/12 bg-[#492828]/[0.03]
            px-3 py-2 text-sm font-semibold text-[#492828]
            transition
            hover:bg-[#492828]/[0.06]
            active:scale-[0.99]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#84934A]/60
            focus-visible:ring-offset-2 focus-visible:ring-offset-[#ECECEC]
          "
        >
          Change profile Info
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="
            inline-flex w-full items-center justify-center rounded-xl
            border border-[#492828]/12 bg-white
            px-3 py-2 text-sm font-semibold text-[#492828]
            transition
            hover:bg-[#492828]/[0.03]
            active:scale-[0.99]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#84934A]/60
            focus-visible:ring-offset-2 focus-visible:ring-offset-[#ECECEC]
          "
        >
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
