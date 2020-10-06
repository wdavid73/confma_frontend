import axios from "axios";
import { API_CONSTANT_MAP } from "../../js/api/endpoints";

export const createShirt = async (shirt) => {
  let data = new FormData();
  data.append("size", shirt.size);
  data.append("price", shirt.price);
  data.append("image", shirt.image, shirt.image.name);
  data.append("type", shirt.type);
  data.append("ref", shirt.ref);

  const res = await axios.post(API_CONSTANT_MAP.uniforms_shirts, data, {
    headers: { "Content-Type": "application/json" },
  });
  return console.log(res.data);
};

export const createDress = (dress) => {
  let data = new FormData();
  data.append("ref", dress.ref);
  data.append("size", dress.size);
  data.append("price", dress.price);
  data.append("image", dress.image, dress.image.name);

  return axios
    .post(API_CONSTANT_MAP.uniforms_dress, data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      return res;
    });
};

export const createPants = async (pants) => {
  let data = new FormData();
  data.append("size", pants.size);
  data.append("price", pants.price);
  data.append("image", pants.image, pants.image.name);
  data.append("type", pants.type);
  data.append("ref", pants.ref);

  const res = await axios.post(API_CONSTANT_MAP.uniforms_pants, data, {
    headers: { "Content-Type": "application/json" },
  });
  return console.log(res.data);
};

export const createUniformMale = async (uniform) => {
  let data = new FormData();
  data.append("pants_id", uniform.pants_id);
  data.append("shirt_id", uniform.shirt_id);
  data.append("institution_id", uniform.institution_id);
  data.append("price", uniform.price);
  const res = await axios.post(API_CONSTANT_MAP.uniforms_dairy_male, data, {
    headers: { "Content-Type": "application/json" },
  });
  return console.log(res.data);
};

export const createUniformFemale = async (uniform) => {
  let data = new FormData();
  data.append("dress_id", uniform.dress_id);
  data.append("shirt_id", uniform.shirt_id);
  data.append("price", uniform.price);
  data.append("institution_id", uniform.institution_id);
  const res = await axios.post(API_CONSTANT_MAP.uniforms_dairy_female, data, {
    header: { "Content-Type": "application/json" },
  });
  return console.log(res.data);
};
