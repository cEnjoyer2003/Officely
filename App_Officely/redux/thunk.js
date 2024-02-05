// import store from "./store";
import {
    setData,
    setLoading,
    setSearchResult,
    setToken,
    setUser,
    updateAvailableCities,
    updateOfficeData,
} from "./actions";

const MOCK = false;
// const BASE_URL = "https://officelyapp.azurewebsites.net/api";
const BASE_URL = MOCK
    ? "http://192.168.1.186:3001"
    : "https://officelyapp.azurewebsites.net/api";

export const login = (options) => async (dispatch, getState) => {
    try {
        const destination = `${BASE_URL}/auth/authenticate`;
        const response = await fetch(destination, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(options),
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw resp.json();
        });
        dispatch(setToken(response.token));
        console.log(response.token);
    } catch (e) {
        console.error(String(e));
    }
};

export const register = (options) => async (dispatch, getState) => {
    try {
        // const register = {
        //     "firstName": options.firstName,
        // }
        const destination = `${BASE_URL}/auth/register`;
        const response = await fetch(destination, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(options),
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw resp;
        });
        // console.log(response);
    } catch (e) {
        console.error(e);
    }
};

export const resetPasswordWithToken = (options) => async (dispatch, getState) => {
    try {
        // const register = {
        //     "firstName": options.firstName,
        // }
        const destination = `${BASE_URL}/auth/change-password`;
        const response = await fetch(destination, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().UserInfo.Token}`,
            },
            body: JSON.stringify(options),
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw resp;
        });
        // console.log(response);
    } catch (e) {
        console.error(e);
    }
};

export const fetchUserInfo = () => async (dispatch, getState) => {
    try {
        const response = await fetch(`${BASE_URL}/user/details`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getState().UserInfo.Token}`,
                // "Content-Type": "application/json",
            },
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw resp;
        });
        dispatch(setUser(response))
    } catch (e) {
        console.error(e.message);
    }
};
// export const quitAcc = () => async (dispatch, getState) => {
//     try {
//     }
// }

export const fetchAvaliableCities = () => async (dispatch, getState) => {
    try {
        const response = await fetch(`${BASE_URL}/office`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getState().UserInfo.Token}`,
                // "Content-Type": "application/json",
            },
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw resp;
        });

        const cities = [...new Set(response.map((item) => item.city))];
        // console.log(cities);
        dispatch(updateAvailableCities(cities));
        // dispatch(setListLiked(response));
    } catch (e) {
        console.error(e.message);
    }
};

const filterParams = (key, item) => {
    if (item === null || item === "") return false;

    switch (key) {
        case "wifi":
            return item;
        case "minimumRating":
            return item !== 0;
        default:
            return true;
    }
};

const formatParams = (key, item) => {
    // console.log(key);
    // console.log(item);

    switch (key) {
        case "startDate":
            return `${key}=${item}T00:00:00`;
        case "endDate":
            return `${key}=${item}T00:00:00`;
        case "minimumRating":
            return `${key}=${item}`;
        default:
            return `${key}=${item}`;
    }
};

const encodeParams = (data) => {
    return Object.entries(data)
        .filter(([key, item]) => filterParams(key, item))
        .map(([key, item]) => formatParams(key, item))
        .join("&");
};

export const searchOffice = () => async (dispatch, getState) => {
    try {
        const state = getState();
        const searchParams = encodeParams(state.OfficeSearchOptions);
        const destination = MOCK
            ? `${BASE_URL}/office`
            : `${BASE_URL}/office/search?${searchParams}`;

        console.log(`Fetching from: ${destination}`);

        // const token = state.UserInfo.Token;
        const response = await fetch(destination, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getState().UserInfo.Token}`,
                // "Content-Type": "application/json",
            },
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw resp;
        });
        dispatch(updateOfficeData(response));
    } catch (e) {
        console.error(e.message);
    }
};

export const searchParking = (options) => async (dispatch, getState) => {
    // TODO
};

export const bookOffice = (options) => async (dispatch, getState) => {
    // TODO
};

export const bookParking = (options) => async (dispatch, getState) => {
    // TODO
};

export const fetchAllBookings = (options) => async (dispatch, getState) => {
    // TODO
};

export const cancelBooking = (options) => async (dispatch, getState) => {
    // TODO
};
