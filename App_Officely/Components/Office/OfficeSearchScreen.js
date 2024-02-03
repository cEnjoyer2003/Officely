import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ThemeColors } from "../Utils/Colors";
import { useSelector, useDispatch } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { Card, Button } from "react-native-paper";

import OfficeCalendar from "./OfficeCalendar";
import { selectOfficeCity } from "../../redux/actions";
import { fetchAvaliableCities, searchOffice } from "../../redux/thunk";

const OfficeSearchScreen = ({ navigation }) => {
    // const [selectedValue, setSelectedValue] = useState(null);

    const cityData = useSelector((state) => state.CityData);
    const city = useSelector((state) => state.OfficeSearchOptions.City);
    const startDate = useSelector(
        (state) => state.OfficeSearchOptions.StartDate
    );
    const endDate = useSelector((state) => state.OfficeSearchOptions.EndDate);

    const dispatch = useDispatch();
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            // The screen is focused
            // Call any action
            dispatch(fetchAvaliableCities());
            setOptions(
                cityData.map((item) => ({
                    label: item.Name,
                    value: item.Name,
                }))
            );
            console.log(cityData);
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    const placeholder = {
        label: "Select a city...",
        value: "",
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
                            dispatch(searchOffice());
                            navigation.push("Office");
                        }}
                        disabled={
                            city === "" || startDate === "" || endDate === ""
                        }
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

export default OfficeSearchScreen;
