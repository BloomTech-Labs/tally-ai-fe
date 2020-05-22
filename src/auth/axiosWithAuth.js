import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    if (token === "undefined") {
        alert("WARNING. Making requests that might require auth while not logged in.");
    }

    return axios.create({
        baseURL: "https://cors-anywhere.herokuapp.com/http://tallyai.us-east-1.elasticbeanstalk.com/api/",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        }
    });
};