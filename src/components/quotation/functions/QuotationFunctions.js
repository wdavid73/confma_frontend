import axios from "axios";
import { API_CONSTANT_MAP } from "../../js/api/endpoints";

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
    .get(API_CONSTANT_MAP.quotation_client_valid + quotationId + "/", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const createQuotation = (quotation, cloth_id) => {
  return axios
    .post(
      API_CONSTANT_MAP.quotation,
      {
        value_cloth: quotation.value_cloth,
        value_work: quotation.value_work,
        value_buttons: quotation.value_buttons,
        value_embroidery: quotation.value_embroidery,
        value_necks: quotation.value_necks,
        value_prints: quotation.value_prints,
        value_threads: quotation.value_threads,
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
  return axios.post(API_CONSTANT_MAP.quotation + "delete/" + id + "/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateQuotation = (quotation) => {
  let _id = quotation.id.toString();
  return axios
    .put(
      API_CONSTANT_MAP.quotation + _id + "/",
      {
        value_cloth: quotation.value_cloth,
        value_work: quotation.value_work,
        value_buttons: quotation.value_buttons,
        value_embroidery: quotation.value_embroidery,
        value_necks: quotation.value_necks,
        value_prints: quotation.value_prints,
        value_threads: quotation.value_threads,
        total: quotation.total,
        clothId: quotation.clothId,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getOneQuotation = (id) => {
  let _id = id.toString();
  return axios
    .get(API_CONSTANT_MAP.get_one_quotation + _id + "/", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
};
