//The "show only favourites" belong in
// uiSlice because it describes what the user is viewing;
// favouritesSlice owns which print ID's are favourites
//The two filters work independently and combines with
// AND: show prints matching the selected colour that are also favourites;
// "all" removes only colour restrictions
//I filtered in Catalog because it already has the print list and both filter choices;
//a selector would need to know about the print list to
import { useSelector, useDispatch } from "react-redux";
import { PRINTS } from "../Data/prints";
import { itemAdded } from "../features/cartSlice";
import {
  filterChanged,
  selectColourFilter,
  favouritesOnlyToggled,
  selectFavouritesOnly,
} from "../features/uiSlice";
import {
  favouriteToggled,
  selectFavouriteIds,
} from "../features/favouritesSlice";

const SWATCH = {
  red: "bg-flat-red",
  blue: "bg-flat-blue",
  yellow: "bg-flat-yellow",
};

const FILTERS = ["all", "red", "blue", "yellow"];

const Catalog = () => {
  const dispatch = useDispatch();
  const colourFilter = useSelector(selectColourFilter);
  const favouritesOnly = useSelector(selectFavouritesOnly);
  const favouriteIds = useSelector(selectFavouriteIds);

  // const visible =
  //   colourFilter === "all"
  //     ? PRINTS
  //     : PRINTS.filter((print) => print.colour === colourFilter);
  const visible = PRINTS.filter((print) => {
    const matchesColour =
      colourFilter === "all" || print.colour === colourFilter;
    const matchesFavourite = !favouritesOnly || favouriteIds.includes(print.id);

    return matchesColour && matchesFavourite;
  });

  return (
    <section>
      <div className="flex border-b-4 border-ink">
        {FILTERS.map((filter) => {
          const isActive = filter === colourFilter;

          return (
            <button
              key={filter}
              onClick={() => dispatch(filterChanged(filter))}
              className={`flex-1 border-r-4 border-ink px-2 py-2 text-xs font-black uppercase ${
                isActive ? "bg-ink text-paper" : "bg-paper"
              }`}
            >
              {filter}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => dispatch(favouritesOnlyToggled())}
          aria-pressed={favouritesOnly}
          className={`flex-1 border-r-4 border-ink px-2 text-xs font-black uppercase ${favouritesOnly ? "bg-ink text-paper" : "bg-paper"}`}
        >
          Favourites
        </button>
      </div>

      <ul className="grid grid-cols-2">
        {visible.map((print) => {
          const isFavourite = favouriteIds.includes(print.id);

          return (
            <li key={print.id} className="border-b-4 border-r-4 border-ink">
              <div className={`h-28 ${SWATCH[print.colour]}`} />

              <div className="flex items-center justify-between gap-2 px-3 py-3">
                <div>
                  <p className="text-sm font-black uppercase">{print.title}</p>
                  <p className="text-xs">${print.price}</p>
                </div>
                <div className="flex item-center gap-2">
                  <button
                    type="button"
                    onClick={() => dispatch(favouriteToggled(print.id))}
                    className="border-4 border-ink bg-flat-yellow px-3 py-1 text-xs font-black uppercase"
                    aria-label={
                      isFavourite
                        ? `Remove ${print.title} from favourites`
                        : `Add ${print.title} to favourites`
                    }
                  >
                    {isFavourite ? "★" : "☆"}
                  </button>

                  <button
                    onClick={() => dispatch(itemAdded(print))}
                    className="border-4 border-ink bg-flat-yellow px-3 py-1 text-xs font-black uppercase"
                  >
                    Add
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Catalog;
