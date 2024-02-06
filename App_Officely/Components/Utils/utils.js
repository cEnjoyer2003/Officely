import moment from "moment";

export const DatetimeToDate = (datetime) => {
    return moment(datetime).format("YYYY-MM-DD");
};

export const calculateCost = (startDate, endDate, price) => {
    return (moment(endDate).diff(startDate, "days") + 1) * price;
};

