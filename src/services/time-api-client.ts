import axios from "axios";

export default  axios.create({
	baseURL: "https://timeapi.io/api/time/current/",
});

