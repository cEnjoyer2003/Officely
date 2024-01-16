import { SET_OFFICE_START_DATE, SET_OFFICE_END_DATE, SELECT_OFFICE_CITY } from "./actions";

const initialState = {
    officeStartDate: "",
    officeEndDate: "",
	officeSelectedCity: "",
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OFFICE_START_DATE:
            return setOfficeStartDate(state, action.payload);
        case SET_OFFICE_END_DATE:
            return setOfficeEndDate(state, action.payload);
		case SELECT_OFFICE_CITY:
            return selectOfficeCity(state, action.payload);
        default:
            return state;
    }
};

const setOfficeStartDate = (state, date) => {
    return {
        ...state,
        officeStartDate: date,
    };
};

const setOfficeEndDate = (state, date) => {
    return {
        ...state,
        officeEndDate: date,
    };
};

const selectOfficeCity = (state, city) => {
    return {
        ...state,
		officeSelectedCity: city,
    };
};

export default rootReducer;
