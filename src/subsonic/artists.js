import { fetchData } from "./Index.js"

const getArtists = async (name) => {
  let data = await fetchData("getIndexes.view", {}, {});
  index = data.indexes.index;
  leter = name.charAt(0).toUpperCase();
  list = index.filter((i) => i.name === leter);
  allArtists = list.map((i) => i.artist);
  matchedArtists = allArtists[0].filter((i) => i.name.toLowerCase().includes(name.toLowerCase()));
  return matchedArtists
}

const getArtist = async (id) => {
  let data = await fetchData("getArtist.view", { id }, {});
  return data.artist;
}
