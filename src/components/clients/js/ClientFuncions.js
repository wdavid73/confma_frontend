import axios from "axios";
import { API_CONSTANT_MAP } from "../../js/api/endpoints";

export const getClients = () => {
  return axios
    .get(API_CONSTANT_MAP.client, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const createClient = (client) => {
  return axios
    .post(
      API_CONSTANT_MAP.client,
      {
        name: client.name,
        last_name: client.last_name,
        address: client.address,
        phone: client.phone,
        cellphone: client.cellphone,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((res) => {
      console.log(res.data);
    });
};

export const detailsOneClient = (id) => {
  let _id = id.toString();
  return axios
    .get(API_CONSTANT_MAP.detail_one_client + _id + "/", {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      return res.data;
    });
};

export const updateClient = (client) => {
  return axios
    .put(
      API_CONSTANT_MAP.client + client.id.toString() + "/",
      {
        name: client.name,
        last_name: client.last_name,
        address: client.address,
        phone: client.phone,
        cellphone: client.cellphone,
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

export const deleteClient = (id) => {
  return axios
    .post(API_CONSTANT_MAP.client + "delete/" + id + "/", {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
