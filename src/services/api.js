import axios from "axios";
import REACT_APP_API_URL from "../URL_Base";

export async function getProducts() {
  try {
    const res = await axios.get(`${REACT_APP_API_URL}/home`);
    return res.data;
  } catch (err) {
    return err.res;
  }
}
