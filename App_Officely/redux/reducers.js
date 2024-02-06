import {
    SET_TOKEN,
    SET_USER,
    SET_CARLY,
    SET_SORT_BY_PRICE,
    SET_MIN_PRICE,
    SET_MAX_PRICE,
    SET_OFFICE_START_DATE,
    SET_OFFICE_END_DATE,
    SELECT_OFFICE_CITY,
    UPDATE_OFFICE_DATA,
    UPDATE_CARLY_DATA,
    UPDATE_CARLY_BOOKING,
    UPDATE_BOOKING_DATA,
    SET_MIN_RATING,
    SET_WIFI_OPTION,
    QUIT_USER,
    UPDATE_AVALIABLE_CITIES,
    SET_MIN_CAPACITY,
    SET_MAX_CAPACITY,
    UPDATE_RATING_DATA,
} from "./actions";

const initialState = {
    ErrorInfo: {
        error: false,
        message: null,
    },
    CarlyInfo: {
        Token: "",
        Id: 0,
    },
    CarlyBooking: [],
    UserInfo: {
        Quited: true,
        Token: "",
        Email: "",
        FirstName: "",
        LastName: "",
        Avatar: "pac-man",
    },
    OfficeSearchOptions: {
        startDate: "",
        endDate: "",
        city: null,
        minimumPrice: null,
        maximumPrice: null,
        sortByPrice: null,
        minimumRating: 0,
        wifi: null,
        minimumCapacity: null,
        maximumCapacity: null,
    },
    CityData: [],
    OfficeData: [],
    CarlyData: [],
    BookingData: [],
    RatingData: {
        officeId: "",
        averageRating: 0,
        ratings: [],
    },
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return setToken(state, action.payload);
        case SET_USER:
            return setUser(state, action.payload);
        case SET_CARLY:
            return setCarlyUser(state, action.payload);
        case QUIT_USER:
            return quitUser(state);
        case SET_OFFICE_START_DATE:
            return setOfficeStartDate(state, action.payload);
        case SET_OFFICE_END_DATE:
            return setOfficeEndDate(state, action.payload);
        case SELECT_OFFICE_CITY:
            return selectOfficeCity(state, action.payload);
        case SET_SORT_BY_PRICE:
            return setSortByPrice(state, action.payload);
        case SET_MIN_PRICE:
            return setMinPrice(state, action.payload);
        case SET_MAX_PRICE:
            return setMaxPrice(state, action.payload);
        case SET_MIN_CAPACITY:
            return setMinCapacity(state, action.payload);
        case SET_MAX_CAPACITY:
            return setMaxCapacity(state, action.payload);
        case SET_MIN_RATING:
            return setMinRating(state, action.payload);
        case SET_WIFI_OPTION:
            return setWifiOption(state, action.payload);
        case UPDATE_AVALIABLE_CITIES:
            return updateAvailableCities(state, action.payload);
        case UPDATE_OFFICE_DATA:
            return updateOfficeData(state, action.payload);
        case UPDATE_CARLY_DATA:
            return updateCarlyData(state, action.payload);
        case UPDATE_BOOKING_DATA:
            return updateBookingData(state, action.payload);
        case UPDATE_RATING_DATA:
            return updateRatingData(
                state,
                action.payload.officeId,
                action.payload.ratingData
            );
        case UPDATE_CARLY_BOOKING:
            return updateCarlyBooking(state, action.payload);
        default:
            return state;
    }
};

const setToken = (state, token) => {
    const UserInfo = {
        ...state.UserInfo,
        Quited: false,
        Token: token,
    };
    return {
        ...state,
        UserInfo,
    };
};

const setUser = (state, info) => {
    const UserInfo = {
        ...state.UserInfo,
        // Quited: false,
        // Token: info.Token,
        Email: info.email,
        FirstName: info.firstName,
        LastName: info.lastName,
    };
    return {
        ...state,
        UserInfo,
    };
};

const setCarlyUser = (state, info) => {
    return {
        ...state,
        CarlyInfo: info
    }
}
const quitUser = (state) => {
    return initialState;
};

const setOfficeStartDate = (state, date) => {
    const OfficeSearchOptions = {
        ...state.OfficeSearchOptions,
        startDate: date,
    };
    return {
        ...state,
        OfficeSearchOptions,
    };
};

const setOfficeEndDate = (state, date) => {
    const OfficeSearchOptions = { ...state.OfficeSearchOptions, endDate: date };
    return {
        ...state,
        OfficeSearchOptions,
    };
};

const selectOfficeCity = (state, city) => {
    const OfficeSearchOptions = { ...state.OfficeSearchOptions, city: city };

    return {
        ...state,
        OfficeSearchOptions,
    };
};

const setSortByPrice = (state, sorting) => {
    const OfficeSearchOptions = {
        ...state.OfficeSearchOptions,
        sortByPrice: sorting,
    };

    return {
        ...state,
        OfficeSearchOptions,
    };
};

const setMinPrice = (state, price) => {
    try {
        const OfficeSearchOptions = {
            ...state.OfficeSearchOptions,
            minimumPrice: price === "" ? null : Number(price),
        };
        return {
            ...state,
            OfficeSearchOptions,
        };
    } catch (error) {
        console.error(error);
    }
    return state;
};

const setMaxPrice = (state, price) => {
    try {
        const OfficeSearchOptions = {
            ...state.OfficeSearchOptions,
            maximumPrice: price === "" ? null : Number(price),
        };

        return {
            ...state,
            OfficeSearchOptions,
        };
    } catch (error) {
        console.error(error);
    }
    return state;
};

const setMinCapacity = (state, capacity) => {
    try {
        const OfficeSearchOptions = {
            ...state.OfficeSearchOptions,
            minimumCapacity: capacity === "" ? null : Number(capacity),
        };
        return {
            ...state,
            OfficeSearchOptions,
        };
    } catch (error) {
        console.error(error);
    }
    return state;
};

const setMaxCapacity = (state, capacity) => {
    try {
        const OfficeSearchOptions = {
            ...state.OfficeSearchOptions,
            maximumCapacity: capacity === "" ? null : Number(capacity),
        };
        return {
            ...state,
            OfficeSearchOptions,
        };
    } catch (error) {
        console.error(error);
    }
    return state;
};

const setMinRating = (state, rating) => {
    const OfficeSearchOptions = {
        ...state.OfficeSearchOptions,
        minimumRating: rating,
    };
    return {
        ...state,
        OfficeSearchOptions,
    };
};

const setWifiOption = (state, wifi) => {
    const OfficeSearchOptions = {
        ...state.OfficeSearchOptions,
        wifi: wifi,
    };

    return {
        ...state,
        OfficeSearchOptions,
    };
};

const updateAvailableCities = (state, cities) => {
    return {
        ...state,
        CityData: cities.map((item) => ({ Name: item })),
    };
};

const updateOfficeData = (state, officeData) => {
    return {
        ...state,
        OfficeData: officeData,
    };
};

const updateCarlyData = (state, CarlyData) => {
    return {
        ...state,
        CarlyData: CarlyData,
    };
};
const updateCarlyBooking = (state, data) => {
    console.log([...state.CarlyBooking, data]);
    return {
        ...state,
        CarlyBooking: [...state.CarlyBooking, data],
    };
};

const updateBookingData = (state, bookingData) => {
    return {
        ...state,
        BookingData: bookingData,
    };
};

const updateRatingData = (state, officeId, ratingData) => {
    const averageRating = ratingData.length
        ? ratingData.reduce((prev, item) => prev + item.ratingValue, 0)
        : 0;
    return {
        ...state,
        RatingData: {
            officeId: officeId,
            averageRating: averageRating,
            ratings: ratingData,
        },
    };
};

export default rootReducer;
