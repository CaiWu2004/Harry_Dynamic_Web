import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeArt,
  selectVisibleArt,
  toggleSortOrder,
  selectSortOrder,
  clearCollection,
} from "../store";

const ArtList = () => {
  //confirmation visibility is temporary UI state local to this component
  //Redux handles the collection data, not this one component's confirmation prompt.
  const [confirmingClear, setConfirmingClear] = useState(false);

  const dispatch = useDispatch();
  // const data = useSelector((state) => state.art.data);
  //Worked out at render time, free 2 pieces of state we already have
  //Nothing new is stored in redux, so nothing can go stale
  // const visible = useSelector((state) =>
  //   state.art.data.filter((art) =>
  //     art.name.toLowercase().includes(state.art.searchterm.toLowercase()),
  //   ),
  // );

  const visible = useSelector(selectVisibleArt);

  const sortOrder = useSelector(selectSortOrder);

  const sortControl = (
    <section className="flex justify-end border-b-4 border-ink p-5">
      <button
        onClick={() => dispatch(toggleSortOrder())}
        className="border-4 border-ink bg-flat-yellow px-3 py-1 text-xs font-black uppercase"
      >
        {sortOrder === "price-desc"
          ? "Show collection order"
          : "Sort by price (highest first)"}
      </button>
    </section>
  );

  const clearControl = (
    <section className="flex items-center justify-end gap-3 border-b-4 border-ink p-5">
      {confirmingClear ? (
        <>
          <span>Clear the entire collection?</span>
          <button
            onClick={() => {
              dispatch(clearCollection());
              setConfirmingClear(false);
            }}
            className="border-4 border-ink bg-flat-red px-3 py-1 text-xs font-black uppercase text-paper"
          >
            Yes, clear
          </button>
          <button
            onClick={() => setConfirmingClear(false)}
            className="border-4 border-ink px-3 py-1 text-xs font-black uppercase"
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          onClick={() => setConfirmingClear(true)}
          className="border-4 border-ink px-3 py-1 text-xs font-black uppercase"
        >
          Clear collection
        </button>
      )}
    </section>
  );

  if (visible.length === 0) {
    return (
      <>
        {sortControl}
        {clearControl}
        <section className="border-b-4 border-ink p-5">
          <p className="text-sm">Nothing to show.</p>
        </section>
      </>
    );
  }

  return (
    <>
      {sortControl}
      {clearControl}
      <ul className="border-b-4 border-ink">
        {visible.map((art) => {
          return (
            <li
              key={art.id}
              className="flex item-center justify-between gap-3 border-b-4 border-ink px-5 py-3 last:border-b-0"
            >
              <p className="text-sm font-black uppercase">
                {art.name} <span className="font-normal">{art.price}</span>
              </p>
              <button
                onClick={() => dispatch(removeArt(art.id))}
                className="border-4 border-ink bg-flat-red px-3 py-1 text0xs font-black uppercase text-paper"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ArtList;
