// import store from "./store";
import { setData, setLoading, setSearchResult } from "./actions";

const BASE_URL = "http://localhost:3001";

// export const login = (options) => async (dispatch, getState) => {
//     // TODO
// };

// export const register = (options) => async (dispatch, getState) => {
//     // TODO
// };

// export const quitAcc = () => async (dispatch, getState) => {
//     try {

//     }

// }


export const fetchAvaliableCities = () => async (dispatch, getState) => {
    // try {
    //     const response = await fetch(`${BASE_URL}/Office/search`, {
    //         method: "GET",
    //     }).then(
    //         (resp) => {
    //             if (resp.ok)
    //                 return resp.json();
    //             else
    //                 throw resp;
    //         }
    //     )
    //     // dispatch(toggleLiked(productId));
    //     // dispatch(setListLiked(response));
    // } catch (e) {
    //     // console.error(e.message);
    //     // dispatch(setListLiked([]));
    // }
    // TODO
};

export const searchOffice = () => async (dispatch, getState) => {
    // TODO
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

