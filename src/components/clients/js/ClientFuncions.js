import axios from "axios";
import { API_CONSTANT_MAP } from "../../js/api/endpoints";

export const getClients = async () => {
  try {
    const res = await axios.get(API_CONSTANT_MAP.client, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const createClient = async (client) => {
  let data = new FormData();
  data.append("name", client.name.trim());
  data.append("last_name", client.last_name.trim());
  data.append("address", client.address.trim());
  data.append("phone", client.phone);
  data.append("cellphone", client.cellphone);

  try {
    const res = await axios.post(API_CONSTANT_MAP.client, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const detailsOneClient = async (id) => {
  let _id = id.toString();
  try {
    const res = await axios.get(
      API_CONSTANT_MAP.detail_one_client + _id + "/",
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const updateClient = async (client) => {
  let data = new FormData();
  data.append("name", client.name.trim());
  data.append("last_name", client.last_name.trim());
  data.append("address", client.address.trim());
  data.append("phone", client.phone);
  data.append("cellphone", client.cellphone);
  try {
    const res = await axios.put(
      API_CONSTANT_MAP.client + client.id.toString() + "/",
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteClient = async (id) => {
  try {
    const res = await axios.post(
      API_CONSTANT_MAP.client + "delete/" + id + "/",
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const findClient = async (id) => {
  try {
    const res = await axios.get(API_CONSTANT_MAP.client_find + id + "/", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
