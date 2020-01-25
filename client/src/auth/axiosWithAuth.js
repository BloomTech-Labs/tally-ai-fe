import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    if(token === "undefined") {
        alert("WARNING. Making requests that might require auth while not logged in.");
    }

    return axios.create({
        baseURL: "https://tally-ai.herokuapp.com/api/",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        }
    });
};