import axios from "axios";

const key = process.env.REACT_APP_YELP_KEY;

export const axiosWithYelpAuth = () => {
  console.log("Yelp headers", {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': 'http://localhost:3000/',
    'Authorization': `Bearer ${key}`
  });
  return axios.create({
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': 'http://localhost:3000/',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': `Bearer ${key}`
    }
  });
}