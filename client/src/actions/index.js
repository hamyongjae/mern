import axios from "axios";
import { FETCH_USER } from "./types";
// action 발행, //api/users/current 사용자 정보 get
export const fetchUser = () => async dispatch => {
    dispatch({
      type: FETCH_USER,
      payload: await axios.get("/api/users/current")
    });
  };