import axios from "axios";
const BASE_API = "http://localhost:8000/api";
const clients = "/clients/";
const cloths = "/cloths/";
const rentals = "/rentals/";
const quotations = "/quotations/";
const quotation_client = "/quotations-clients/";
const uniforms_dairy_male = "/uniforms/dairy_male/";
const uniforms_dairy_male_shirts = "/uniforms/dairy_male/shirts/";
const uniforms_dairy_male_pants = "/uniforms/dairy_male/pants/";
const uniforms_dairy_female = "/uniforms/dairy_female/";
const uniforms_dairy_female_shirts = "/uniforms/dairy_female/shirts/";
const uniforms_dairy_female_dresses = "/uniforms/dairy_female/dresses/";
const uniforms_sport = "/uniforms/sports/";
const uniforms_sport_shirts = "/uniforms/sports/shirts/";
const uniforms_sport_sweatshirt = "/uniforms/sports/sweat_shirt/";

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
  list_endpoints: BASE_API + "/",
  uniforms_dairy_male: BASE_API + uniforms_dairy_male,
  uniforms_dairy_male_shirts: BASE_API + uniforms_dairy_male_shirts,
  uniforms_dairy_male_pants: BASE_API + uniforms_dairy_male_pants,
  uniforms_dairy_male_find: BASE_API + uniforms_dairy_male + "find/",
  uniforms_dairy_female: BASE_API + uniforms_dairy_female,
  uniforms_dairy_female_shirts: BASE_API + uniforms_dairy_female_shirts,
  uniforms_dairy_female_dresses: BASE_API + uniforms_dairy_female_dresses,
  uniforms_sport: BASE_API + uniforms_sport,
  uniforms_sport_shirts: BASE_API + uniforms_sport_shirts,
  uniforms_sport_sweatshirt: BASE_API + uniforms_sport_sweatshirt,
};

export const getEndpoints = async () => {
  const res = await axios.get(BASE_API + "/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
