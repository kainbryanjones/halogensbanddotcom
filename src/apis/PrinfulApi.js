import axios from "axios";

const API_KEY = process.env.REACT_APP_CAPTCHA_SITE_KEY

const PrintfulApi = axios.create({
    baseURL: "https://cors-anywhere.herokuapp.com/https://api.printful.com/",
    headers:{
        Authorization: `Basic ${API_KEY}`
    }
})
