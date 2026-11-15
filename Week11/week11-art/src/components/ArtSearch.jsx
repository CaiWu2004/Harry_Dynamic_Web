import { useSelector, useDispatch } from "react-redux";
import { changeSearchTerm } from "../store";

const ArtSearch = () => {
  const disptach = useDispatch();
  const searchTerm = useSelector((state) => state.art.searchTerm);

  const handleChange = (event) => {
    disptach(changeSearchTerm(event.target.value));
  };
  return (
    <section className="flex item-cetner gap-3 border-b-4 border-ink p-5">
      <label
        htmlFor="search"
        className="text-xs font-black uppercase tracking-widest"
      >
        Search
      </label>

      <input
        id="searc"
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Filter by Name"
        className="flex-1 border-4 border-ink bg-white px-3 py-2"
      />
    </section>
  );
};

export default ArtSearch;
