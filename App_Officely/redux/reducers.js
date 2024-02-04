import {
    SET_USER,
    SET_SORT_BY_PRICE,
    SET_MIN_PRICE,
    SET_MAX_PRICE,
    SET_OFFICE_START_DATE,
    SET_OFFICE_END_DATE,
    SELECT_OFFICE_CITY,
    UPDATE_OFFICE_DATA,
    UPDATE_PARKING_DATA,
    UPDATE_BOOKING_DATA,
    SET_MIN_RATING,
    SET_WIFI_OPTION,
} from "./actions";

const initialState = {
    UserInfo: {
        Email: "boxuan.zhang.stud@pw.edu.pl",
        FirstName: "Boxuan",
        LastName: "Zhang",
    },
    OfficeSearchOptions: {
        StartDate: "",
        EndDate: "",
        City: "",
        SortByPrice: null,
        MinPrice: "0",
        MaxPrice: "9999999",
        MinRating: 0,
        Wifi: false,
    },
    CityData: [{ Name: "Warszawa" }, { Name: "Krakow" }, { Name: "Gdansk" }],
    OfficeData: [
        {
            office_id: "123e4567-e89b-12d3-a456-426614174001",
            Name: "TechHub Workspace",
            Address: "123 Main Street",
            facilities: "Meeting rooms, coworking spaces",
            Contact: "contact@techhub.com",
            Rating: 4.5,
            Price: 150.0,
            wifi: true,
            City: "San Francisco",
            PictureUri:
                "https://plus.unsplash.com/premium_photo-1661775434014-9c0e8d71de03?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            office_id: "456e7890-12ab-34cd-56ef-789012345678",
            Name: "Innovate Office Suites",
            Address: "456 Oak Avenue",
            facilities: "Private offices, event spaces",
            Contact: "info@innovateoffices.com",
            Rating: 4.2,
            Price: 200.0,
            wifi: true,
            City: "New York",
            PictureUri:
                "https://plus.unsplash.com/premium_photo-1661775434014-9c0e8d71de03?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            office_id: "456e7890-12ab-34cd-56ef-789012345678",
            Name: "Innovate Office Suites",
            Address: "456 Oak Avenue",
            facilities: "Private offices, event spaces",
            Contact: "info@innovateoffices.com",
            Rating: 4.2,
            Price: 200.0,
            wifi: true,
            City: "New York",
            PictureUri:
                "https://plus.unsplash.com/premium_photo-1661775434014-9c0e8d71de03?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            office_id: "456e7890-12ab-34cd-56ef-789012345678",
            Name: "Innovate Office Suites",
            Address: "456 Oak Avenue",
            facilities: "Private offices, event spaces",
            Contact: "info@innovateoffices.com",
            Rating: 4.2,
            Price: 200.0,
            wifi: true,
            City: "New York",
            PictureUri:
                "https://plus.unsplash.com/premium_photo-1661775434014-9c0e8d71de03?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            office_id: "456e7890-12ab-34cd-56ef-789012345678",
            Name: "Innovate Office Suites",
            Address: "456 Oak Avenue",
            facilities: "Private offices, event spaces",
            Contact: "info@innovateoffices.com",
            Rating: 4.2,
            Price: 200.0,
            wifi: true,
            City: "New York",
            PictureUri:
                "https://plus.unsplash.com/premium_photo-1661775434014-9c0e8d71de03?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ],
    ParkingData: [],
    BookingData: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return setUser(state, action.payload);
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
        case SET_MIN_RATING:
            return setMinRating(state, action.payload);
        case SET_WIFI_OPTION:
            return setWifiOption(state, action.payload);
        case UPDATE_OFFICE_DATA:
            return updateOfficeData(state, action.payload);
        case UPDATE_PARKING_DATA:
            return updateParkingData(state, action.payload);
        case UPDATE_BOOKING_DATA:
            return updateBookingData(state, action.payload);
        default:
            return state;
    }
};

const setUser = (state, info) => {
    const UserInfo = {
        Email: info.Email,
        FirstName: info.FirstName,
        LastName: info.LastName,
    };
    return {
        ...state,
        UserInfo,
    };
};

const setOfficeStartDate = (state, date) => {
    const OfficeSearchOptions = {
        ...state.OfficeSearchOptions,
        StartDate: date,
    };
    return {
        ...state,
        OfficeSearchOptions,
    };
};

const setOfficeEndDate = (state, date) => {
    const OfficeSearchOptions = { ...state.OfficeSearchOptions, EndDate: date };
    return {
        ...state,
        OfficeSearchOptions,
    };
};

const selectOfficeCity = (state, city) => {
    const OfficeSearchOptions = { ...state.OfficeSearchOptions, City: city };

    return {
        ...state,
        OfficeSearchOptions,
    };
};

const setSortByPrice = (state, sorting) => {
    const OfficeSearchOptions = {
        ...state.OfficeSearchOptions,
        SortByPrice: sorting,
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
            MinPrice: parseInt(price),
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
            MaxPrice: parseInt(price),
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
        MinRating: rating,
    };
    return {
        ...state,
        OfficeSearchOptions,
    };
};

const setWifiOption = (state, wifi) => {
    const OfficeSearchOptions = {
        ...state.OfficeSearchOptions,
        Wifi: wifi,
    };

    return {
        ...state,
        OfficeSearchOptions,
    };
};

const updateOfficeData = (state, officeData) => {
    return {
        ...state,
        OfficeData: officeData,
    };
};

const updateParkingData = (state, parkingData) => {
    return {
        ...state,
        ParkingData: parkingData,
    };
};

const updateBookingData = (state, bookingData) => {
    return {
        ...state,
        BookingData: bookingData,
    };
};

export default rootReducer;
