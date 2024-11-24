import { fetchData } from "./Index.js"

const getSong = async (id) => {
  let data = await fetchData("getSong.view", { id }, {});
  return data.song;
}
