import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_w8GphQHxvyjgTctJKibWFc1C00Y93S8M7hkKzih4uzut8CbV6ubLjteRkKyR6Qed";


export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds");
}

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
}


// import { fetchBreeds, fetchCatByBreed } from "./index.js"

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");


function populateBreedsSelect(breeds) {
  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.text = breed.name;
    breedSelect.add(option);
  });
}


function loadBreeds() {
  loader.style.display = "block";
  breedSelect.style.display = "none";
  error.style.display = "none";

  fetchBreeds()
    .then((response) => {
      populateBreedsSelect(response.data);
      loader.style.display = "none";
      breedSelect.style.display = "block";
    })
    .catch((err) => {
      console.error(err);
      loader.style.display = "none";
      error.style.display = "block";
    });
}


function displayCatInfo() {
  const selectedBreedId = breedSelect.value;

  loader.style.display = "block";
  catInfo.style.display = "none";
  error.style.display = "none";

  fetchCatByBreed(selectedBreedId)
    .then((response) => {
      const catData = response.data[0];
      const breedName = catData.breeds[0].name;
      const description = catData.breeds[0].description;
      const temperament = catData.breeds[0].temperament;

     
      catInfo.innerHTML = `
        <h3>${breedName}</h3>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Temperament:</strong> ${temperament}</p>
        <img src="${catData.url}" alt="${breedName}" />
      `;

      loader.style.display = "none";
      catInfo.style.display = "block";
    })
    .catch((err) => {
      console.error(err);
      loader.style.display = "none";
      error.style.display = "block";
    });
}


breedSelect.addEventListener("change", displayCatInfo);


loadBreeds();



























// const selectInput = document.querySelector(".breed-select");
// const containerCat = document.querySelector(".cat-info");

// async function serviceCat() {
//     const BASE_URL = "https://api.thecatapi.com";
//     const END_POINT = "/v1/images/search";

//     try {
//         const response = await axios.get(`${BASE_URL}${END_POINT}`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching cat breeds:", error);
//         throw error;
//     }
// }

// export async function fetchCatByBreed(breedId) {
//     try {
//         const response = await axios.get(`${BASE_URL}${END_POINT}?breed_ids=${breedId}`)
//         return response.data[0];
//     } catch (error) {
//         console.error("Error fetching cat by breed:", error);
//         throw error;
//     }
// }

























