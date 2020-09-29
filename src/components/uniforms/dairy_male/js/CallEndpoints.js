import axios from "axios";
import { API_CONSTANT_MAP } from "../../../js/api/endpoints";

export const getListUniforms = async () => {
  const res = await axios.get(API_CONSTANT_MAP.uniforms_dairy_male, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const createShirtMale = async (shirt) => {
  let data = new FormData();
  data.append("size", shirt.size);
  data.append("price", shirt.price);
  data.append("image", shirt.image, shirt.image.name);

  const res = await axios.post(
    API_CONSTANT_MAP.uniforms_dairy_male_shirts,
    data,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return console.log(res.data);
};

export const getShirtsMale = async () => {
  const res = await axios.get(API_CONSTANT_MAP.uniforms_dairy_male_shirts, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const createPantsMale = async (pants) => {
  let data = new FormData();
  data.append("size", pants.size);
  data.append("price", pants.price);
  data.append("image", pants.image, pants.image.name);

  const res = await axios.post(
    API_CONSTANT_MAP.uniforms_dairy_male_pants,
    data,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return console.log(res.data);
};

export const getPantsMale = async () => {
  const res = await axios.get(API_CONSTANT_MAP.uniforms_dairy_male_pants, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const CreateUniformeMale = async () => {};
