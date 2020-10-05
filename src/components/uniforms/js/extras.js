import axios from "axios";
import { API_CONSTANT_MAP } from "../../js/api/endpoints";

export const findByCollege = async (id) => {
  const res = await axios.get(
    API_CONSTANT_MAP.uniforms_dairy_male_find + id + "/",
    {
      headers: { "Content-Type": "application" },
    }
  );
  return res.data;
};

export const findByCollegeFemale = async (id) => {
  const res = await axios.get(
    API_CONSTANT_MAP.uniforms_dairy_female_find + id + "/",
    {
      headers: { "Content-Type": "application" },
    }
  );
  return res.data;
};
