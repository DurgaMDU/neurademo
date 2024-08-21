import axios from "axios"; 
// For common config
axios.defaults.baseURL = import.meta.env.VITE_APP_APIBASE
const http = axios.create({
    headers: {
      "Content-type": "application/json"
    }
});

export {
  http
};