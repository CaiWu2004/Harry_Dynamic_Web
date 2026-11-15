import { useSelector, useDispatch } from "react-redux";
import { removeArt, selectVisibleArt } from "../store";

const ArtList = () => {
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

  if (visible.length === 0) {
    return (
      <section className="border-b-4 border-ink p-5">
        <p className="text-sm">Nothing to show.</p>
      </section>
    );
  }

  return (
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
  );
};

export default ArtList;
