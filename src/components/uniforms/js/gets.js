import axios from "axios";
import { API_CONSTANT_MAP } from "../../js/api/endpoints";

export const getListUniforms = async () => {
  const res = await axios.get(API_CONSTANT_MAP.uniforms_dairy_male, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const getListUniformsFemale = async () => {
  const res = await axios.get(API_CONSTANT_MAP.uniforms_dairy_female, {
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

export const getShirtsMale = async () => {
  const res = await axios.get(API_CONSTANT_MAP.uniforms_shirts + "male/", {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const getPantsMale = async () => {
  const res = await axios.get(API_CONSTANT_MAP.uniforms_pants + "male/", {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const getPantsFemale = async () => {
  const res = await axios.get(API_CONSTANT_MAP.uniforms_pants + "female/", {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const getShirtsFemale = async () => {
  const res = await axios.get(API_CONSTANT_MAP.uniforms_shirts + "female/", {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const getDress = () => {
  return axios
    .get(API_CONSTANT_MAP.uniforms_dress, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      return res.data;
    });
};
