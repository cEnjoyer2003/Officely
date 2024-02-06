// import store from "./store";
import {
    setData,
    setLoading,
    setSearchResult,
    setToken,
    setUser,
    updateAvailableCities,
    updateBookingData,
    updateOfficeData,
} from "./actions";

const MAX_INT = 1000000;
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

export const resetPasswordWithToken =
    (options) => async (dispatch, getState) => {
        try {
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
        dispatch(setUser(response));
    } catch (e) {
        console.error(e.message);
    }
};

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
        dispatch(updateAvailableCities(cities));
    } catch (e) {
        console.error(e.message);
    }
};

const formatSearchOptions = (data) => ({
    startDateTime: `${data.startDate}T00:00:00`,
    endDateTime: `${data.endDate}T00:00:00`,
    city: data.city,
    minimumPrice: data.minimumPrice === null ? 0 : Number(data.minimumPrice),
    maximumPrice:
        data.maximumPrice === null || data.maximumPrice < data.minimumPrice
            ? MAX_INT
            : Number(data.maximumPrice),
    minimumCapacity:
        data.minimumCapacity === null ? 0 : Number(data.minimumCapacity),
    maximumCapacity:
        data.maximumCapacity === null ||
        data.maximumCapacity < data.minimumCapacity
            ? MAX_INT
            : Number(data.maximumCapacity),
    minimumRating: data.minimumRating,
    wifi: data.wifi,
    sortByPrice: data.sortByPrice,
});

export const searchOffice = () => async (dispatch, getState) => {
    try {
        const state = getState();
        const options = formatSearchOptions(state.OfficeSearchOptions);
        const destination = MOCK
            ? `${BASE_URL}/office`
            : `${BASE_URL}/office/search`;

        console.log(`Fetching from: ${destination}`);
        console.log(options);

        const response = await fetch(destination, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${getState().UserInfo.Token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(options),
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw resp.json();
        });
        console.log(response);
        dispatch(updateOfficeData(response));
    } catch (e) {
        console.error(e);
    }
};

export const searchParking = (options) => async (dispatch, getState) => {
    // TODO
};

export const bookOffice = (options) => async (dispatch, getState) => {
    try {
        // const state = getState();
        // const options = formatSearchOptions(state.OfficeSearchOptions);
        const destination = `${BASE_URL}/booking/${options.officeId}`;
        const body = {
            officeId: options.officeId,
            startDateTime: `${options.startDate}T00:00:00`,
            endDateTime: `${options.endDate}T00:00:00`,
        };
        // console.log(`Fetching from: ${destination}`);
        // console.log(options);

        const response = await fetch(destination, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${getState().UserInfo.Token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw resp.json();
        });
        console.log(response);
        dispatch(updateOfficeData(response));
    } catch (e) {
        console.error(e);
    }
};

export const bookParking = (options) => async (dispatch, getState) => {
    // TODO
};

export const fetchMyBookings = (options) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${BASE_URL}/booking/my-bookings`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getState().UserInfo.Token}`,
            },
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw resp;
        });

        // const cities = [...new Set(response.map((item) => item.city))];
        dispatch(updateBookingData(response));
    } catch (e) {
        console.error(e.message);
    }
};

export const cancelBooking = (bookingId) => async (dispatch, getState) => {
    try {
        const destination = `${BASE_URL}/booking/${bookingId}`
        const response = await fetch(destination, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${getState().UserInfo.Token}`,
            },
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw resp;
        });

        // const cities = [...new Set(response.map((item) => item.city))];
        // dispatch(updateBookingData(response));
    } catch (e) {
        console.error(e.message);
    }
};
