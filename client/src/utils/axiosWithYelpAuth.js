import axios from "axios";

const key = process.env.YELP_KEY;

const axiosWithYelpAuth = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${key}`
  }
});

export default axiosWithYelpAuth;
