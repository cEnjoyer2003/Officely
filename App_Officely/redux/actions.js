export const SET_OFFICE_START_DATE = "SET_OFFICE_START_DATE";
export const SET_OFFICE_END_DATE = "SET_OFFICE_END_DATE";
export const SELECT_OFFICE_CITY = "SELECT_OFFICE_CITY";

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
// export const setSearchResult = (countires) => ({
//     type: SET_SEARCH_RESULT,
//     payload: countires,
// });
