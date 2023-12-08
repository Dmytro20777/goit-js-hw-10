
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_w8GphQHxvyjgTctJKibWFc1C00Y93S8M7hkKzih4uzut8CbV6ubLjteRkKyR6Qed";


const BASE_URL = "https://api.thecatapi.com/v1/breeds"



export function fetchBreeds() {
  return axios.get(`${BASE_URL}`);
}

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
}