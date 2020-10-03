import axios from "axios";
import { API_CONSTANT_MAP } from "../../../js/api/endpoints";

export const getListUniforms = async () => {
  const res = await axios.get(API_CONSTANT_MAP.uniforms_dairy_male, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const getInstitutions = async () => {
  const res = await axios.get(API_CONSTANT_MAP.institutions, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

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

export const getShirtsMale = async () => {
  const res = await axios.get(API_CONSTANT_MAP.uniforms_shirts + "male/", {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
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

export const getPantsMale = async () => {
  const res = await axios.get(API_CONSTANT_MAP.uniforms_pants + "male/", {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
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

export const findByCollege = async (id) => {
  const res = await axios.get(
    API_CONSTANT_MAP.uniforms_dairy_male_find + id + "/",
    {
      headers: { "Content-Type": "application" },
    }
  );
  return res.data;
};
