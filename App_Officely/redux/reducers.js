import { SET_DATA, SET_LOADING } from "./actions";

const initialState = {
	loading: true,
	countries: [],
	// searching: false,
	// filteredCountries: [],
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_DATA:
			return setData(state, action.payload);
		case SET_LOADING:
			return setLoading(state, action.payload);
	
		// case SET_SEARCH_RESULT:
		// 	return setSearchResult(state, action.payload)
		default:
			return state;
	}
};

const setData = (state, countries) => {
	return {
		...state,
		loading : false,
		countries,
	};
}

const setLoading = (state, loading) => {
	return {
		...state,
		loading,
	};
}


const setSearchResult = (state, countries) => {
	return {
		...state,
		loading : false,
		filteredCountries: countries,
	};
}


export default rootReducer;
