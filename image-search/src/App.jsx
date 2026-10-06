//i only want cat to be seaech once and no more so i used [] in useEffect.
// It searchs for cats when it first loads and thats it.
// Empty array means react has nothing
// to watch so it never run more than once making it a defualt.
//if i want to search again i would need to use the search bar

//if i put 'images' in the array,
// the effect fetches the photos and then setImages(results)
// gives 'images' a new value. With this change react will run the effect
// again fetch the photos and the images get replace again.
//this loops for 50 or more times unstil I ran out of fetches in unsplash

import { useState, useEffect } from "react";
import SearchBar from "./Components/SearchBar";
import ImageList from "./Components/ImageList";
import { searchImages } from "./api";

const DEFAULT_TERM = "cats";

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (term) => {
    setIsLoading(true);
    setError(null);
    setSearched(true);

    try {
      // console.log(`Searching for: ${term}`)
      // since our imageSearch function is async and we need to await the results,
      // we need to await when calling searchImages()
      // which means, you need to flag this function async
      const results = await searchImages(term);
      setImages(results);
    } catch (err) {
      console.error(err);
      setError("The search did not work. Check the console.");
    } finally {
      setIsLoading(false);
    }
  };

  //run a defualt search once
  useEffect(() => {
    const loadDefault = async () => {
      try {
        const results = await searchImages(DEFAULT_TERM);
        setImages(results);
        setSearched(true);
      } catch (err) {
        console.error(err);
        setError("The search did not work. Check the console.");
      } finally {
        setIsLoading(false);
      }
    };
    loadDefault();
  }, []);

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} initialTerm={DEFAULT_TERM} /> <br />
      {isLoading && <p className="p-4 text-gray-500">Searching ...</p>}
      {error && <p className="p-4 text-red-500">{error}</p>}
      {!isLoading && !error && searched && images.length === 0 && (
        <p className="p-4 text-gray-500">
          No photos for that one. Try another word!
        </p>
      )}
      <ImageList images={images} />
    </div>
  );
};

export default App;
