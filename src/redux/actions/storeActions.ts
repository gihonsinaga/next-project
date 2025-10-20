import axios from "axios";
import { AppDispatch } from "../store";
import { setStores } from "../reducers/storeReducers";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/recipes`;

export const getStore = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}/tags`);

    dispatch(setStores(response.data));
  } catch (error) {
    console.error("Error fetching stores:", error);
  }
};
