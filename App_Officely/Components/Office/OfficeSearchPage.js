import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { ThemeColors } from "../Utils/color";
import { useSelector, useDispatch } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { Card, Button } from "react-native-paper";

import OfficeCalendar from "./OfficeCalendar";
import { selectOfficeCity } from "../../redux/actions";

const OfficeSearchPage = ({ navigation }) => {
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
            <Card style={styles.container}>
                <Card.Content>
                    <OfficeCalendar />
                    <RNPickerSelect
                        onValueChange={(value) => {
                            dispatch(selectOfficeCity(value));
                        }}
                        items={options}
                        placeholder={placeholder}
                        value={city}
                        style={{
                            placeholder: {
                                color: ThemeColors.Main,
                                fontSize: 14,
                                fontWeight: "bold",
                            },
                        }}
                    />
                    <Button
                        mode="elevated"
                        onPress={() => {
                            navigation.push("Office");
                        }}
                    >
                        Search
                    </Button>
                </Card.Content>
            </Card>
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

export default OfficeSearchPage;
