// import store from "./store";
import {
    setData,
    setLoading,
    setSearchResult,
    setToken,
    setUser,
    updateAvailableCities,
    updateBookingData,
    updateOfficeData,
    updateCarlyData,
    updateRatingData,
    updateCarlyBooking,
    setCarlyUser,
} from "./actions";

const MAX_INT = 1000000;
const MOCK = false;
// const BASE_URL = "https://officelyapp.azurewebsites.net/api";
const BASE_URL = MOCK
    ? "http://192.168.1.186:3001"
    : "https://officelyapp.azurewebsites.net/api";

const CARLY_URL = "https://pw-react-carly.azurewebsites.net";

export const login = (options) => async (dispatch, getState) => {
    try {
        const destination = `${BASE_URL}/auth/authenticate`;
        const response = await fetch(destination, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(options),
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw "Wrong Password or Email.";
        });
        dispatch(setToken(response.token));
        const username = options.email;
        const carlyOptions = {
            username : options.email,
            password : options.password
         }
         console.log(carlyOptions);
        const destinationCarly = `${CARLY_URL}/auth/authenticate`;
        const responseCarly = await fetch(destinationCarly, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(carlyOptions),
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw "Wrong Password or Email carly.";
        });
        console.log(responseCarly);

        const destIdCarly = `${CARLY_URL}/users?username=${options.email}`
        const responseIdCarly = await fetch(destIdCarly, {
            method: "Get",
            headers: {
                Authorization: `Bearer ${responseCarly.token}`,
            },
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw "Wrong Username.";
        });
        console.log(responseIdCarly);


        carlyInfo = {
            Token: responseCarly.token,
            Id : responseIdCarly[0].id
        }

        dispatch(setCarlyUser(carlyInfo));

    } catch (e) {
        console.error(e);
    }
};

export const register = (options) => async (dispatch, getState) => {
    try {
        const destination = `${BASE_URL}/auth/register`;
        const response = await fetch(destination, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(options),
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw "Forbidden Registration.";
        });
        // console.log(response);
    } catch (e) {
        console.error(e);
    }
};
export const resetPasswordWithEmail =
    (options) => async (dispatch, getState) => {
        try {
            const loginBody = {
                email: options.email,
                password: options.oldPassword,
            };
            const loginDest = `${BASE_URL}/auth/authenticate`;
            const loginResponse = await fetch(loginDest, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginBody),
            }).then((resp) => {
                if (resp.ok) return resp.json();
                else throw "Wrong Old Password";
            });

            const body = {
                newPassword: options.newPassword,
                oldPassword: options.oldPassword,
            };
            const destination = `${BASE_URL}/auth/change-password`;
            const response = await fetch(destination, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${loginResponse.Token}`,
                },
                body: JSON.stringify(body),
            }).then((resp) => {
                if (resp.ok) return resp;
                else throw "Reset Password Failed";
            });
        } catch (e) {
            console.error(e);
        }
    };

export const resetPasswordWithToken =
    (options) => async (dispatch, getState) => {
        try {
            const destination = `${BASE_URL}/auth/change-password`;
            const response = await fetch(destination, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().UserInfo.Token}`,
                },
                body: JSON.stringify(options),
            }).then((resp) => {
                if (resp.ok) return resp;
                else throw "Reset Password Failed";
            });
        } catch (e) {
            console.error(e);
        }
    };

export const fetchUserInfo = () => async (dispatch, getState) => {
    try {
        const response = await fetch(`${BASE_URL}/user/details`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getState().UserInfo.Token}`,
                // "Content-Type": "application/json",
            },
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw resp;
        });
        dispatch(setUser(response));
    } catch (e) {
        console.error(e.message);
    }
};

export const fetchAvaliableCities = () => async (dispatch, getState) => {
    try {
        const response = await fetch(`${BASE_URL}/office`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getState().UserInfo.Token}`,
                // "Content-Type": "application/json",
            },
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw resp;
        });

        const cities = [...new Set(response.map((item) => item.city))];
        dispatch(updateAvailableCities(cities));
    } catch (e) {
        console.error(e.message);
    }
};

const formatSearchOptions = (data) => ({
    startDateTime: `${data.startDate}T00:00:00`,
    endDateTime: `${data.endDate}T00:00:00`,
    city: data.city,
    minimumPrice: data.minimumPrice === null ? 0 : Number(data.minimumPrice),
    maximumPrice:
        data.maximumPrice === null || data.maximumPrice < data.minimumPrice
            ? MAX_INT
            : Number(data.maximumPrice),
    minimumCapacity:
        data.minimumCapacity === null ? 0 : Number(data.minimumCapacity),
    maximumCapacity:
        data.maximumCapacity === null ||
        data.maximumCapacity < data.minimumCapacity
            ? MAX_INT
            : Number(data.maximumCapacity),
    minimumRating: data.minimumRating,
    wifi: data.wifi,
    sortByPrice: data.sortByPrice,
});

export const searchOffice = () => async (dispatch, getState) => {
    try {
        const state = getState();
        const options = formatSearchOptions(state.OfficeSearchOptions);
        const destination = MOCK
            ? `${BASE_URL}/office`
            : `${BASE_URL}/office/search`;

        // console.log(`Fetching from: ${destination}`);
        // console.log(options);

        const response = await fetch(destination, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${getState().UserInfo.Token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(options),
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw "fail to search office";
        });
        // console.log(response);
        dispatch(updateOfficeData(response));
    } catch (e) {
        console.error(e);
    }
};

export const searchParking = (options) => async (dispatch, getState) => {
    // TODO
};

export const bookOffice = (options) => async (dispatch, getState) => {
    try {
        // const state = getState();
        // const options = formatSearchOptions(state.OfficeSearchOptions);
        const destination = `${BASE_URL}/booking/${options.officeId}`;
        const body = {
            origin: "officely",
            officeId: options.officeId,
            startDateTime: `${options.startDate}T00:00:00`,
            endDateTime: `${options.endDate}T00:00:00`,
        };
        // console.log(`Fetching from: ${destination}`);
        // console.log(options);

        const response = await fetch(destination, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${getState().UserInfo.Token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw "Fail to book office";
        });
        // console.log(response);
        dispatch(updateOfficeData(response));
    } catch (e) {
        console.error(e);
    }
};

export const bookParking = (options) => async (dispatch, getState) => {
    // TODO
};

export const fetchMyBookings = (options) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${BASE_URL}/booking/my-bookings`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getState().UserInfo.Token}`,
            },
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw "Failed to fetch bookings";
        });

        // const cities = [...new Set(response.map((item) => item.city))];
        dispatch(updateBookingData(response));
    } catch (e) {
        console.error(e);
    }
};

export const cancelBooking = (bookingId) => async (dispatch, getState) => {
    try {
        const destination = `${BASE_URL}/booking/${bookingId}`;
        const response = await fetch(destination, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${getState().UserInfo.Token}`,
            },
        }).then((resp) => {
            if (resp.ok) return;
            else throw "fail to cancel booking";
        });

        // const cities = [...new Set(response.map((item) => item.city))];
        // dispatch(updateBookingData(response));
    } catch (e) {
        console.error(e);
    }
};

export const fetchRating = (officeId) => async (dispatch, getState) => {
    try {
        const destination = `${BASE_URL}/rating/${officeId}`;
        const response = await fetch(destination, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getState().UserInfo.Token}`,
            },
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw resp;
        });
        // console.log(response);
        // console.log(getState().RatingData)
        // const cities = [...new Set(response.map((item) => item.city))];
        dispatch(updateRatingData(officeId, response));
    } catch (e) {
        console.error(e.message);
    }
};

export const updateRating =
    (officeId, rating, comment) => async (dispatch, getState) => {
        try {
            const destination = `${BASE_URL}/rating/${officeId}`;
            const body = {
                ratingValue: Number(rating),
                comment: comment,
            };
            // console.log(body);
            // console.log(destination)
            const response = await fetch(destination, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getState().UserInfo.Token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }).then((resp) => {
                if (resp.ok) return;
                else throw resp;
            });
        } catch (e) {
            console.error(e);
        }
    };

export const fetchCarly = () => async (dispatch, getState) => {
    try {
        const destination = `${CARLY_URL}/cars`;
        console.log(getState().CarlyInfo);
        const response = await fetch(destination, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${getState().CarlyInfo.Token}`,
            },
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw resp;
        });
        // console.log(response);
        dispatch(updateCarlyData(response));
    } catch (e) {
        console.error(e);
    }
};

export const bookCar = (carId) => async (dispatch, getState) => {
    try {
        const destination = `${CARLY_URL}/reservations`;
        const CarlyInfo = getState().CarlyInfo;
        const body = {
            userId: CarlyInfo.Id,
            carId: carId,
            startDate: getState().OfficeSearchOptions.startDate,
            endDate: getState().OfficeSearchOptions.endDate,
        };
        console.log(body);

        const response = await fetch(destination, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${getState().CarlyInfo.Token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw resp;
        });
        console.log(response);
        dispatch(updateCarlyBooking(response));
    } catch (e) {
        console.error(e);
    }
};

export const fetchCarBooking = (id) => async (dispatch, getState) => {
    try {
        const destination = `${CARLY_URL}/cars`;
        const CarlyInfo = getState().CarlyInfo;
        const body = {
            userId: CarlyInfo.Id,
            carId: carId,
            startDate: getState().OfficeSearchOptions.startDate,
            endDate: getState().OfficeSearchOptions.endDate,
        };

        const response = await fetch(destination, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${getState().CarlyInfo.Token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((resp) => {
            if (resp.ok) return resp.json();
            else throw resp;
        });
        
    } catch (e) {
        console.error(e);
    }
};
