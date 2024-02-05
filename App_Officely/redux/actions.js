export const SET_USER = "SET_USER";
export const SET_OFFICE_START_DATE = "SET_OFFICE_START_DATE";
export const SET_OFFICE_END_DATE = "SET_OFFICE_END_DATE";
export const SELECT_OFFICE_CITY = "SELECT_OFFICE_CITY";
export const UPDATE_OFFICE_DATA = "UPDATE_OFFICE_DATA";
export const UPDATE_PARKING_DATA = "UPDATE_PARKING_DATA";
export const UPDATE_BOOKING_DATA = "UPDATE_BOOKING_DATA";

export const setUser = (info) => ({
    type: SET_USER,
    payload: info,
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
