import axios from "axios";
import { API_CONSTANT_MAP } from "../../js/api/endpoints";

export const getClothWithOutQuotation = async () => {
  const res = await axios.get(API_CONSTANT_MAP.quotation_cloth, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const getQuotations = async () => {
  const res = await axios.get(API_CONSTANT_MAP.quotation, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const getClientNotDuplicated = async (quotationId) => {
  const res = await axios.get(
    API_CONSTANT_MAP.quotation_client_valid + quotationId + "/",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const createQuotation = async (quotation, cloth_id) => {
  let data = new FormData();
  data.append("value_cloth", quotation.value_cloth);
  data.append("value_work", quotation.value_work);
  data.append("value_buttons", quotation.value_buttons);
  data.append("value_embroidery", quotation.value_embroidery);
  data.append("value_necks", quotation.value_necks);
  data.append("value_prints", quotation.value_prints);
  data.append("value_threads", quotation.value_threads);
  data.append("clothId", cloth_id);
  data.append("total", 0);
  try {
    const res = await axios.post(API_CONSTANT_MAP.quotation, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const createQuotationClient = async (quotationId, clientId) => {
  try {
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
  } catch (error) {
    return error;
  }
};

export const deleteQuotation = async (id) => {
  try {
    return axios.post(API_CONSTANT_MAP.quotation + "delete/" + id + "/", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return error;
  }
};

export const updateQuotation = async (quotation) => {
  let _id = quotation.id.toString();
  let data = new FormData();
  data.append("value_cloth", quotation.value_cloth);
  data.append("value_work", quotation.value_work);
  data.append("value_buttons", quotation.value_buttons);
  data.append("value_embroidery", quotation.value_embroidery);
  data.append("value_necks", quotation.value_necks);
  data.append("value_prints", quotation.value_prints);
  data.append("value_threads", quotation.value_threads);
  data.append("clothId", quotation.clothId);
  data.append("total", quotation.total);
  try {
    const res = await axios.put(API_CONSTANT_MAP.quotation + _id + "/", data, {
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const getOneQuotation = async (id) => {
  let _id = id.toString();
  const res = await axios.get(API_CONSTANT_MAP.get_one_quotation + _id + "/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
