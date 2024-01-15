import { useState } from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import { ThemeColors } from "../Utils/color";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { setOfficeStartDate, setOfficeEndDate } from "../../redux/actions";

const OfficeCalendar = () => {
    const startDate = useSelector((state) => state.officeStartDate);
    const endDate = useSelector((state) => state.officeEndDate);
    const dispatch = useDispatch();

    // const [startDate, useStartDate] = useState();
    // const [endDate, useEndDate] = useState();
    const [selectedRange, useSelectedRange] = useState({});
    const setDates = (start, end) => {
        var selected = {};
        for (
            var m = moment(start);
            m.diff(end, "days") <= 0;
            m.add(1, "days")
        ) {
            selected = {
                ...selected,
                [m.format("YYYY-MM-DD")]: {
                    selected: true,
                    disableTouchEvent: false,
                    color: ThemeColors.Focus,
                },
            };
        }
        useSelectedRange(selected);
    };
    return (
        <View>
            <Calendar
                minDate={moment().format("YYYY-MM-DD")}
                onDayPress={(day) => {
                    let selecting = startDate !== "" && endDate === "";
                    if (selecting) {
                        if (moment(day.dateString) < moment(startDate)) {
                            dispatch(setOfficeStartDate(day.dateString));
                        } else {
                            dispatch(setOfficeEndDate(day.dateString));
                            setDates(startDate, day.dateString);
                        }
                    } else {
                        dispatch(setOfficeStartDate(day.dateString));
                        dispatch(setOfficeEndDate(""));
                        useSelectedRange({});
                    }
                }}
                markingType={"period"}
                markedDates={{
                    ...selectedRange,
                    [moment().format("YYYY-MM-DD")]: {
                        textColor: ThemeColors.Side,
                    },
                    [startDate]: {
                        selected: true,
                        disableTouchEvent: false,
                        color: ThemeColors.Focus,
                        startingDay: true,
                    },
                    [endDate]: {
                        selected: true,
                        disableTouchEvent: false,
                        startingDay: startDate===endDate,
                        endingDay: true,
                        color: ThemeColors.Focus,
                    },
                }}
            />
        </View>
    );
};

export default OfficeCalendar;
