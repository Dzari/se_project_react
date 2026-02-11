import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/contexts";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );

  const isC = currentTemperatureUnit === "C";

  return (
    <label
      className="
        group relative inline-flex h-10 w-24 cursor-pointer select-none items-center
        rounded-full border border-[#ECECEC]/15 bg-[#ECECEC]/[0.04] p-1
        shadow-sm shadow-black/20
        transition
        hover:bg-[#ECECEC]/[0.06]
        active:scale-[0.99]
        focus-within:ring-offset-2 focus-within:ring-offset-[#492828]
      "
      title="Toggle temperature unit"
    >
      {/* Accessible control */}
      <input
        type="checkbox"
        className="sr-only"
        role="switch"
        aria-label="Toggle temperature unit"
        aria-checked={isC}
        checked={isC}
        onChange={handleToggleSwitchChange}
      />

      {/* Sliding thumb */}
      <span
        className={[
          "absolute left-1 top-1 h-8 w-11 rounded-full",
          "bg-gradient-to-br from-[#656D3F] to-[#84934A]",
          "shadow-md shadow-black/30",
          "transition-transform duration-200 ease-out",
          "group-active:scale-[0.98]",
          isC ? "translate-x-11" : "translate-x-0",
        ].join(" ")}
      />

      {/* Labels */}
      <span className="relative z-10 flex w-full items-center justify-between px-2 text-xs font-semibold tracking-wide">
        <span className={isC ? "text-[#ECECEC]/60" : "text-[#ECECEC]"}>F</span>
        <span className={isC ? "text-[#ECECEC]" : "text-[#ECECEC]/60"}>C</span>
      </span>
    </label>
  );
};

export default ToggleSwitch;
