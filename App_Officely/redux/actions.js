export const SET_USER = "SET_USER";
export const QUIT_USER = "QUIT_USER";

export const SET_OFFICE_START_DATE = "SET_OFFICE_START_DATE";
export const SET_OFFICE_END_DATE = "SET_OFFICE_END_DATE";
export const SELECT_OFFICE_CITY = "SELECT_OFFICE_CITY";
export const SET_SORT_BY_PRICE = "SET_SORT_BY_PRICE";
export const SET_MIN_PRICE = "SET_MIN_PRICE";
export const SET_MAX_PRICE = "SET_MAX_PRICE";
export const SET_MIN_RATING = "SET_MIN_RATING";
export const SET_WIFI_OPTION = "SET_WIFI_OPTION";


export const UPDATE_OFFICE_DATA = "UPDATE_OFFICE_DATA";
export const UPDATE_PARKING_DATA = "UPDATE_PARKING_DATA";
export const UPDATE_BOOKING_DATA = "UPDATE_BOOKING_DATA";

export const setUser = (info) => ({
    type: SET_USER,
    payload: info,
});

export const quitUser = () => ({
    type: QUIT_USER,
    // payload: null,
});

export const setOfficeStartDate = (date) => ({
    type: SET_OFFICE_START_DATE,
    payload: date,
});

export const setOfficeEndDate = (date) => ({
    type: SET_OFFICE_END_DATE,
    payload: date,
});

export const selectOfficeCity = (city) => ({
    type: SELECT_OFFICE_CITY,
    payload: city,
});

export const setSortByPrice = (sorting) => ({
    type: SET_SORT_BY_PRICE,
    payload: sorting,
});

export const setMinPrice = (price) => ({
    type: SET_MIN_PRICE,
    payload: price,
});

export const setMaxPrice = (price) => ({
    type: SET_MAX_PRICE,
    payload: price,
});

export const setMinRating = (rating) => ({
    type: SET_MIN_RATING,
    payload: rating,
});

export const setWifiOption = (wifi) => ({
    type: SET_WIFI_OPTION,
    payload: wifi,
});

export const updateOfficeData = (officeData) => ({
    type: SELECT_OFFICE_CITY,
    payload: officeData,
});

export const updateParkingData = (parkingData) => ({
    type: UPDATE_PARKING_DATA,
    payload: parkingData,
});

export const updateBookingData = (bookingData) => ({
    type: UPDATE_BOOKING_DATA,
    payload: bookingData,
});
