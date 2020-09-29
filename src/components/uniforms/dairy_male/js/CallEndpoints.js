import axios from "axios";
import { API_CONSTANT_MAP } from "../../../js/api/endpoints";

export const getListUniforms = async () => {
  const res = await axios.get(API_CONSTANT_MAP.uniforms_dairy_male, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};
