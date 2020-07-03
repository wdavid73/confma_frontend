const BASE_API = "http://127.0.0.1:8000/api";

export const API_CONSTANT_MAP = {
  client: BASE_API + "/clients/",
  detail_one_client: BASE_API + "/clients/details/",
  cloth: BASE_API + "/cloths/",
  rental: BASE_API + "/rentals/",
  refundRental: BASE_API + "/rentals/refund/",
  rental_cloth: BASE_API + "/rentals/cloths/",
  quotation: BASE_API + "/quotations/",
  quotation_client: BASE_API + "/quotations_clients/",
  quotation_cloth: BASE_API + "/quotations/quotations_cloth/",
  quotation_client_not_duplicated:
    BASE_API + "/quotations_clients/clientnotduplicated/",
  isvalidcloth: BASE_API + "/isvalidcloth/",
};