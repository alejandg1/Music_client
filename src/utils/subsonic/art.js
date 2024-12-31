import { fetchData } from "./Index.js"
import { getConfig } from "../local/config.js";

export const getCoverArt = async (id) => {
  let size = await getConfig("sizeCover")
  let data = await fetchData("getCoverArt.view", { id, size }, {});
  return data;
}
