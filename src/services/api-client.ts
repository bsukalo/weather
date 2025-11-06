import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

export default axios.create({
  baseURL: "https://api.weatherapi.com/v1",
  params: {
    key: apiKey,
  },
});
