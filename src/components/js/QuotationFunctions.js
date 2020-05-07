import axios from "axios";
import { API_CONSTANT_MAP } from "./api/index";

export const getClothWithOutQuotation = () => {
  return axios
    .get(API_CONSTANT_MAP.quotation_cloth, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const getQuotations = () => {
  return axios
    .get(API_CONSTANT_MAP.quotation, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const getClientNotDuplicated = (quotationId) => {
  return axios
    .get(API_CONSTANT_MAP.quotation_client_not_duplicated + quotationId + "/", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const createQuotation = (
  value_cloth,
  value_work,
  value_buttons,
  value_embroidery,
  value_necks,
  value_prints,
  value_threads,
  cloth_id
) => {
  return axios
    .post(
      API_CONSTANT_MAP.quotation,
      {
        value_cloth: value_cloth,
        value_work: value_work,
        value_buttons: value_buttons,
        value_embroidery: value_embroidery,
        value_necks: value_necks,
        value_prints: value_prints,
        value_threads: value_threads,
        clothId: cloth_id,
        total: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      console.log(res);
    });
};

export const createQuotationClient = (quotationId, clientId) => {
  return axios.post(
    API_CONSTANT_MAP.quotation_client,
    {
      quotationId: quotationId,
      clientId: clientId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteQuotation = (id) => {
  return axios
    .post(API_CONSTANT_MAP.quotation + "delete/" + id + "/", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res.data);
    });
};
