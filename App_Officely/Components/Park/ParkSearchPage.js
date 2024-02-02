import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { ThemeColors } from "../Utils/color";
import { useSelector, useDispatch } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { Card, Button } from "react-native-paper";

const ParkSearchPage = ({ navigation }) => {
    // const [selectedValue, setSelectedValue] = useState(null);
    const city = useSelector((state) => state.officeSelectedCity);

    const dispatch = useDispatch();
    const options = [
        { label: "Warszawa", value: "Warszawa" },
        { label: "Gdańsk", value: "Gdańsk" },
        { label: "Kraków", value: "Kraków" },
    ];

    const placeholder = {
        label: "Select a city...",
        value: null,
        color: ThemeColors.Main,
    };
    return (
        <View>
            <Text>this is parkly page</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: ThemeColors.White,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    pickerInput: {
        textAlign: "center",
        fontSize: 16,
        color: "black",
    },
});

export default ParkSearchPage;
