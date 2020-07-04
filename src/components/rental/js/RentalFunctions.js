import axios from "axios";
import { API_CONSTANT_MAP } from "../../js/api/endpoints";

let date_now = new Date();

export const getRental = () => {
  return axios
    .get(API_CONSTANT_MAP.rental, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
};

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

export const refundRental = (rentalId) => {
  let id = rentalId.toString();
  return axios.post(API_CONSTANT_MAP.refundRental + id + "/", {
    headers: { "Content-Type": "application/json" },
  });
};

export const getClothWithOutRental = () => {
  return axios
    .get(API_CONSTANT_MAP.rental_cloth, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const createRental2 = (rental) => {
  let return_date = new Date(rental.date_return);
  if (date_now < return_date && parseInt(rental.price) >= 5000) {
    return axios
      .post(
        API_CONSTANT_MAP.rental,
        {
          date_return: rental.date_return,
          price: rental.price,
          clothId: rental.cloth_id,
          clientId: rental.client_id,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log(res);
      });
  } else {
    console.log("Fecha mal ingresada o precio menor a 5000");
  }
};

export const createRental = (rental, cloth, client) => {
  let return_date = new Date(rental.date_return);
  if (date_now < return_date && parseInt(rental.price) >= 5000) {
    return axios
      .post(
        API_CONSTANT_MAP.rental,
        {
          date_return: rental.date_return,
          price: rental.price,
          clothId: cloth,
          clientId: client,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log(res);
      });
  } else {
    console.log("Fecha mal ingresada o precio menor a 5000");
  }
};
