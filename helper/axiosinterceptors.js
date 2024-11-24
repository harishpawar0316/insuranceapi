const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});
const getData = async (url, req) => {
    return new Promise((resolve, reject) => {
        axiosInstance.get(url, {
            headers: {
                Authorization: req.headers.authorization
            }
        }).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            console.log("error", error)
            reject(error);
        })
    })
}
module.exports = { getData };