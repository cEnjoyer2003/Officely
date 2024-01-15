export const SET_DATA = "SET_DATA";
export const SET_LOADING = "SET_LOADING";
// export const SET_SEARCH_RESULT = "SET_SEARCH_RESULT";

export const setData = (countires) => ({
    type: SET_DATA,
    payload: countires,
});

export const setLoading = (loading) => ({
    type: SET_LOADING,
    payload: loading,
});

// export const setSearchResult = (countires) => ({
//     type: SET_SEARCH_RESULT,
//     payload: countires,
// });
