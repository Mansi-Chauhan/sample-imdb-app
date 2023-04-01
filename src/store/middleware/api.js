import axios from "axios";
import * as actions from "../api";

const api =
    ({ dispatch }) =>
        (next) =>
            async (action) => {

                if (action.type !== actions.apiCallBegan.type) return next(action);

                const { method, data, onStart, onSuccess, onError } = action.payload;

                if (onStart) dispatch({ type: onStart });

                next(action);
                let headers = {
                    'X-RapidAPI-Key': 'ZlwRwvmaLXmshZL92nWYO5mP5HVdp1HdeREjsnZF4hOiIu9xJ8',
                    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
                }
                try {
                    const response = await axios.request({
                        baseURL: "https://run.mocky.io/v3/1af89ef1-4e00-4efd-8cd2-69d78010b6d4?q=bat",
                        method,
                        data,
                        headers
                    });
                    dispatch(actions.apiCallSucess(response.data));
                    if (onSuccess)
                        dispatch({ type: onSuccess, payload: response.data });
                } catch (error) {
                    dispatch(actions.apiCallFailed(error.message));
                    if (onError) dispatch({ type: onError, payload: error.message });
                }
            };

export default api;