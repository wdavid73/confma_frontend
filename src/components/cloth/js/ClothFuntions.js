import axios from "axios";
import { API_CONSTANT_MAP } from "../../js/api/endpoints";

export const getCloth = async () => {
  try {
    const res = await axios.get(API_CONSTANT_MAP.cloth, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const createCloth = async (cloth) => {
  let data = new FormData();
  data.append("name", cloth.name.trim());
  data.append("color", cloth.color.trim());
  data.append("size", cloth.size);
  data.append("fashion", cloth.fashion);
  data.append("image", cloth.image, cloth.image.name);

  try {
    const res = await axios.post(API_CONSTANT_MAP.cloth, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
