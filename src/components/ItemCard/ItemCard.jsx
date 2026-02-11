import { useContext } from "react";
import { CurrentUserContext, LoggedInContext } from "../../contexts/contexts";

import likeUnliked from "../../assets/likeButton_unliked.svg";
import likeLiked from "../../assets/likeButton_liked.svg";

export default function ItemCard({ card, onClick, handleCardLike }) {
  const { isLoggedIn } = useContext(LoggedInContext);
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = Boolean(
    isLoggedIn && currentUser?._id && card?.likes?.includes(currentUser._id),
  );

  const handleCardClick = () => onClick?.(card);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    handleCardLike?.(card);
  };

  return (
    <li className="group">
      <button
        type="button"
        onClick={handleCardClick}
        className="
          w-full text-left
          overflow-hidden rounded-2xl
          border border-[#492828]/10
          bg-white
          shadow-sm shadow-black/5
          transition
          hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#84934A]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#ECECEC]
        "
        aria-label={`Open ${card?.name ?? "item"}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[#492828]/[0.03] rounded-t-2xl">
          <img
            src={card?.imageUrl}
            alt={card?.name}
            loading="lazy"
            className="
              h-full w-full object-cover
              transition duration-300
              group-hover:scale-[1.03]
            "
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Like button */}
          {isLoggedIn && (
            <button
              type="button"
              onClick={handleLikeClick}
              className="
                absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full
                border border-white/30 bg-white/75 backdrop-blur
                shadow-sm shadow-black/10 transition
                hover:bg-white active:scale-[0.98]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#84934A]/60
              "
              aria-label={isLiked ? "Remove like" : "Like item"}
              aria-pressed={isLiked}
            >
              <img
                src={isLiked ? likeLiked : likeUnliked}
                alt=""
                aria-hidden="true"
                className="h-[15px] w-[18px]"
              />
            </button>
          )}

          {/* Weather bubble */}
          {card?.weather && (
            <div className="absolute bottom-3 left-3">
              <span className="inline-flex items-center rounded-full bg-white/80 px-2.5 py-1 text-xs font-semibold text-[#492828] backdrop-blur">
                {card.weather}
              </span>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <h2 className="min-w-0 truncate text-sm font-semibold text-[#492828]">
            {card?.name}
          </h2>

          <span className="text-xs font-medium text-[#656D3F] opacity-0 transition group-hover:opacity-100">
            View
          </span>
        </div>
      </button>
    </li>
  );
}
