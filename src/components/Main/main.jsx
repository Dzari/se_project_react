import { useContext, useMemo } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

import {
  CurrentTemperatureUnitContext,
  CurrentUserContext,
  LoggedInContext,
} from "../../contexts/contexts";

const Main = ({
  weatherData,
  handleCardClick,
  clothingItems = [],
  handleCardLike,
}) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const { currentUser } = useContext(CurrentUserContext);
  const { isLoggedIn } = useContext(LoggedInContext);

  const visibleItems = useMemo(() => {
    if (!weatherData?.type) return [];

    return clothingItems.filter((card) => {
      const matchesWeather = card.weather === weatherData.type;
      if (!matchesWeather) return false;

      // When logged in, only show the user's items (matching your current behavior)
      if (isLoggedIn) return card.owner === currentUser?._id;

      return true;
    });
  }, [clothingItems, weatherData?.type, isLoggedIn, currentUser?._id]);

  const tempValue = weatherData?.temp?.[currentTemperatureUnit];

  return (
    <main className="w-full">
      {/* Weather banner */}
      <WeatherCard weatherData={weatherData} />

      {/* Cards section */}
      <section className="mx-auto w-full max-w-6xl px-4 py-6 md:py-10">
        <div className="mb-4 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#ECECEC]/90">
              {tempValue != null ? (
                <>
                  Today is{" "}
                  <span className="text-[#ECECEC] tabular-nums">
                    {tempValue}
                  </span>
                  <span className="text-[#ECECEC]/80">
                    {" "}
                    &deg;{currentTemperatureUnit}
                  </span>
                  <span className="text-[#ECECEC]/60"> • </span>
                  <span className="text-[#ECECEC]/85">
                    You may want to wear:
                  </span>
                </>
              ) : (
                <span className="text-[#ECECEC]/70">
                  Loading recommendations…
                </span>
              )}
            </p>

            <p className="mt-1 text-xs text-[#ECECEC]/60">
              Showing{" "}
              <span className="text-[#ECECEC]/80 tabular-nums">
                {visibleItems.length}
              </span>{" "}
              item{visibleItems.length === 1 ? "" : "s"} for{" "}
              <span className="text-[#ECECEC]/80">
                {weatherData?.type ?? "—"}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-[#ECECEC]/10 bg-[#ECECEC]/[0.04] px-2.5 py-1 text-xs font-semibold text-[#ECECEC]/75">
              {weatherData?.isDay ? "Day" : "Night"}
            </span>
          </div>
        </div>

        {visibleItems.length === 0 ? (
          <div className="rounded-2xl border border-[#ECECEC]/10 bg-[#ECECEC]/[0.03] p-6 text-sm text-[#ECECEC]/70">
            No items match this weather yet. Try adding a few clothes for{" "}
            <span className="text-[#ECECEC]/85">
              {weatherData?.type ?? "today"}
            </span>
            .
          </div>
        ) : (
          <ul
            className="
              grid list-none gap-4 p-0
              grid-cols-2
              sm:grid-cols-3
              lg:grid-cols-4
            "
          >
            {visibleItems.map((card) => (
              <ItemCard
                key={card._id}
                card={card}
                onClick={handleCardClick}
                handleCardLike={handleCardLike}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default Main;
