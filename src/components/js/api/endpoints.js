const BASE_API = "http://127.0.0.1:8000/api";
const clients = "/clients/";
const cloths = "/cloths/";
const rentals = "/rentals/";
const quotations = "/quotations/";
const quotation_client = "/quotations-clients/";

export const API_CONSTANT_MAP = {
  client: BASE_API + clients,
  detail_one_client: BASE_API + clients + "details/",
  client_find: BASE_API + clients + "find/",
  cloth: BASE_API + cloths,
  rental: BASE_API + rentals,
  refundRental: BASE_API + rentals + "refund/",
  rental_cloth: BASE_API + rentals + "cloths/",
  quotation: BASE_API + quotations,
  quotation_cloth: BASE_API + quotations + "quotations_cloth/",
  get_one_quotation: BASE_API + quotations + "get_one/",
  quotation_client: BASE_API + quotation_client,
  is_valid_cloth: BASE_API + "/is_valid_cloth/",
  quotation_client_valid: BASE_API + quotation_client + "client_valid/",
};
