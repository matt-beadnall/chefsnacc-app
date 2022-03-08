import axios from "axios";

export const eventsRequest = async (userId) => {
    return await axios
        .get(
            `http://${process.env.REACT_APP_BACKEND_SERVER}/chefsnacc/events/${userId}`
        )
}

export const recipesRequest = async (userId) => {
    return await axios.get(
        `http://${process.env.REACT_APP_BACKEND_SERVER}/chefsnacc/recipes/user/${userId}`
    )
}

export const ingredientsRequest = async (userId) => {
    return await axios.get(
        `http://${process.env.REACT_APP_BACKEND_SERVER}/chefsnacc/ingredients/`
    )
}