// import store from "./store";
import { setData, setLoading, setSearchResult } from "./actions";

const BASE_URL = "https://restcountries.com/v3.1";

export const fetchAllCountries = () => async (dispatch, getState) => {
    dispatch(setLoading(true));
    const response = await fetch(`${BASE_URL}/all`).then((response) => {
        if (response.ok) return response.json();
        else throw response;
    });
    dispatch(setData(response));
};

export const fetchCountriesByName = (name) => async (dispatch, getState) => {
    dispatch(setLoading(true));
    const response = await fetch(`${BASE_URL}/name/${name}`).then((response) => {
        if (response.ok) return response.json();
        else return [];
    });
    dispatch(setData(response));
};
