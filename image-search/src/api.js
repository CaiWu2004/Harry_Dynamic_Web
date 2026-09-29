import axios from "axios";

const KEY = import.meta.env.VITE_UNSPLASH_KEY;

export const searchImages = async (term) => {
  //await is a note to js please don't
  // continue to execute code until
  // response promise is resolved
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: `Client-ID ${KEY}`,
    },
    params: { query: term },
  });

  console.log(response);
  return response.data.results;
};

export default searchImages;
