import moment from "moment";

export const DatetimeToDate = (datetime) => {
    return moment(datetime).format("YYYY-MM-DD");
};
