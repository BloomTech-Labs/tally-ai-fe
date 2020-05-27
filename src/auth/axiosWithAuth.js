
import axios from 'axios';

// OLD CODE

// export const axiosWithAuth = () => {
//     const token = localStorage.getItem('token');

//     if (token === "undefined") {
//         alert("WARNING. Making requests that might require auth while not logged in.");
//     }

//     return axios.create({
//         baseURL: "https://cors-anywhere.herokuapp.com/http://tallyai.us-east-1.elasticbeanstalk.com/api/",
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `${token}`,
//         }
//     });
// };

export const axiosWithAuth = () => {
    return axios.create({
        baseURL: "http://localhost:5000",
        withCredentials: true
    })
}