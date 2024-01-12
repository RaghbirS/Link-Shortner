import axios from "axios"
import Cookies from "js-cookie"

// const token = JSON.parse(Cookies.get('token')) || "";
// const headers = {
//     'Authorization': `Bearer ${token}`
// }

const apiLink = "http://localhost:3001/";
export default function HTTP(token) {
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    return {
        get: function (route) {
            return axios.get(`${route}`, { headers })
        },
        post: function (route, data) {
            return axios.post(`${route}`, data, { headers })
        },
        patch: function (route, data) {
            return axios.patch(`${route}`, data, { headers })
        },
        delete: function (route) {
            return axios.delete(`${route}`, { headers })
        }
    }
}
