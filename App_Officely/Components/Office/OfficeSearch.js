import { useState } from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import { ThemeColors } from "../Utils/color";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { setOfficeStartDate, setOfficeEndDate } from "../../redux/actions";
import OfficeCalendar from "./OfficeCalendar";

const OfficeSearch = () => {
    const startDate = useSelector((state) => state.officeStartDate);

    return (
        <View>
            <OfficeCalendar />
            
        </View>
    );
};

export default OfficeSearch;
