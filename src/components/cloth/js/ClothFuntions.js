import axios from "axios";
import { API_CONSTANT_MAP } from "../../js/api/endpoints";

export const getCloth = () => {
  return axios
    .get(API_CONSTANT_MAP.cloth, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const createCloth = (cloth) => {
  let data = new FormData();
  data.append("name", cloth.name);
  data.append("color", cloth.color);
  data.append("size", cloth.size);
  data.append("fashion", cloth.fashion);
  data.append("image", cloth.image, cloth.image.name);

  return axios
    .post(API_CONSTANT_MAP.cloth, data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      console.log(res);
    });
};
