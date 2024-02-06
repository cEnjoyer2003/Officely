import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { ThemeColors } from "../Utils/Colors";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { setOfficeStartDate, setOfficeEndDate } from "../../redux/actions";

const OfficeCalendar = () => {
    const startDate = useSelector((state) => state.OfficeSearchOptions.startDate);
    const endDate = useSelector((state) => state.OfficeSearchOptions.endDate);
    const dispatch = useDispatch();

    const [selectedRange, useSelectedRange] = useState({});
    const setDates = (start, end) => {
        if (start==="" || end ===""){
            useSelectedRange({})
            return;
        }
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
                    color: ThemeColors.Orange,
                },
            };
        }
        useSelectedRange(selected);
        return;
    };

    useEffect(() => setDates(startDate, endDate), [startDate, endDate]);

    return (
        <View>
            <Calendar
                style={styles.container}
                minDate={moment().format("YYYY-MM-DD")}
                onDayPress={(day) => {
                    let selecting = startDate !== "" && endDate === "";
                    if (selecting) {
                        if (moment(day.dateString) < moment(startDate)) {
                            dispatch(setOfficeStartDate(day.dateString));
                        } else {
                            dispatch(setOfficeEndDate(day.dateString));
                            // setDates(startDate, day.dateString);
                        }
                    } else {
                        dispatch(setOfficeStartDate(day.dateString));
                        dispatch(setOfficeEndDate(""));
                        // useSelectedRange({});
                    }
                }}
                markingType={"period"}
                markedDates={{
                    ...selectedRange,
                    [moment().format("YYYY-MM-DD")]: {
                        textColor: ThemeColors.LightBlue,
                    },
                    [startDate]: {
                        selected: true,
                        disableTouchEvent: false,
                        color: ThemeColors.Orange,
                        startingDay: true,
                    },
                    [endDate]: {
                        selected: true,
                        disableTouchEvent: false,
                        startingDay: startDate === endDate,
                        endingDay: true,
                        color: ThemeColors.Orange,
                    },
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: ThemeColors.PureWhite,
    }
});

export default OfficeCalendar;
