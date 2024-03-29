export const SET_TOKEN = "SET_TOKEN";
export const SET_USER = "SET_USER";
export const QUIT_USER = "QUIT_USER";
export const SET_CARLY = "SET_CARLY";

export const SET_OFFICE_START_DATE = "SET_OFFICE_START_DATE";
export const SET_OFFICE_END_DATE = "SET_OFFICE_END_DATE";
export const SELECT_OFFICE_CITY = "SELECT_OFFICE_CITY";
export const SET_SORT_BY_PRICE = "SET_SORT_BY_PRICE";
export const SET_MIN_PRICE = "SET_MIN_PRICE";
export const SET_MAX_PRICE = "SET_MAX_PRICE";
export const SET_MIN_CAPACITY = "SET_MIN_CAPACITY";
export const SET_MAX_CAPACITY = "SET_MAX_CAPACITY";
export const SET_MIN_RATING = "SET_MIN_RATING";
export const SET_WIFI_OPTION = "SET_WIFI_OPTION";

export const UPDATE_AVALIABLE_CITIES = "UPDATE_AVALIABLE_CITIES";
export const UPDATE_OFFICE_DATA = "UPDATE_OFFICE_DATA";
export const UPDATE_CARLY_DATA = "UPDATE_CARLY_DATA";
export const UPDATE_BOOKING_DATA = "UPDATE_BOOKING_DATA";
export const UPDATE_RATING_DATA = "UPDATE_RATING_DATA";
export const UPDATE_CARLY_BOOKING = "UPDATE_CARLY_BOOKING";


export const setToken = (token) => ({
    type: SET_TOKEN,
    payload: token,
});

export const setUser = (info) => ({
    type: SET_USER,
    payload: info,
});

export const setCarlyUser = (info) => ({
    type: SET_CARLY,
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

export const setMinCapacity = (capacity) => ({
    type: SET_MIN_CAPACITY,
    payload: capacity,
});

export const setMaxCapacity = (capacity) => ({
    type: SET_MAX_CAPACITY,
    payload: capacity,
});

export const setMinRating = (rating) => ({
    type: SET_MIN_RATING,
    payload: rating,
});

export const setWifiOption = (wifi) => ({
    type: SET_WIFI_OPTION,
    payload: wifi,
});

export const updateAvailableCities = (cities) => ({
    type: UPDATE_AVALIABLE_CITIES,
    payload: cities,
});

export const updateOfficeData = (officeData) => ({
    type: UPDATE_OFFICE_DATA,
    payload: officeData,
});

export const updateCarlyData = (carlyData) => ({
    type: UPDATE_CARLY_DATA,
    payload: carlyData,
});

export const updateCarlyBooking = (data) => ({
    type: UPDATE_CARLY_BOOKING,
    payload: data,
});

export const updateBookingData = (bookingData) => ({
    type: UPDATE_BOOKING_DATA,
    payload: bookingData,
});

export const updateRatingData = (officeId, ratingData) => ({
    type: UPDATE_RATING_DATA,
    payload: {
        officeId,
        ratingData
    },
});
