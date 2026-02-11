import { useContext, useMemo } from "react";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/contexts";

const ClothesSection = ({
  clothingItems,
  onCardClick,
  onAddClick,
  handleCardLike,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  const userItems = useMemo(() => {
    const id = currentUser?._id;
    if (!id) return [];
    return (clothingItems || []).filter((item) => item.owner === id);
  }, [clothingItems, currentUser?._id]);

  return (
    <section className="min-w-0">
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-[#492828]">Your Items</h2>
          <p className="mt-1 text-xs text-[#492828]/60">
            {userItems.length} item{userItems.length === 1 ? "" : "s"}
          </p>
        </div>

        <button
          type="button"
          onClick={onAddClick}
          className="
            inline-flex items-center justify-center rounded-2xl px-4 py-2
            text-sm font-semibold
            bg-[#84934A] text-[#ECECEC]
            shadow-sm shadow-black/10
            transition
            hover:bg-[#656D3F] hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/15
            active:translate-y-0 active:scale-[0.99]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#84934A]/60
            focus-visible:ring-offset-2 focus-visible:ring-offset-[#ECECEC]
          "
        >
          + Add new
        </button>
      </div>

      {userItems.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-[#492828]/10 bg-[#492828]/[0.03] p-6 text-sm text-[#492828]/70">
          You don't have any items yet. Add your first one to start building
          your wardrobe.
        </div>
      ) : (
        <ul className="mt-5 grid list-none gap-4 p-0 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {userItems.map((card) => (
            <ItemCard
              key={card._id}
              card={card}
              onClick={onCardClick}
              handleCardLike={handleCardLike}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default ClothesSection;
