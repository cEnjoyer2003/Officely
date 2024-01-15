import { SET_OFFICE_START_DATE, SET_OFFICE_END_DATE } from "./actions";

const initialState = {
    officeStartDate: "",
    officeEndDate: "",
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OFFICE_START_DATE:
            return setOfficeStartDate(state, action.payload);
        case SET_OFFICE_END_DATE:
            return setOfficeEndDate(state, action.payload);
        default:
            return state;
    }
};

const setOfficeStartDate = (state, date) => {
	console.log(state);
    return {
        ...state,
        officeStartDate: date,
    };
};

const setOfficeEndDate = (state, date) => {
	console.log(state);

    return {
        ...state,
        officeEndDate: date,
    };
};

export default rootReducer;
