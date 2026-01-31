import API from "../axios.js"


export const getLoggedInUser = () => {
    return API.get("/me");
}