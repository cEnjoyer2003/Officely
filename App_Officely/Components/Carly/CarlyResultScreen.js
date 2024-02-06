import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState } from "react";

import HeaderBar from "../Utils/HeaderBar";
import ConfirmBox from "../Utils/ConfirmBox";
import SearchInfoTool from "../Utils/SearchInfoTool";
import { ThemeColors } from "../Utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import CarlyCard from "./CarlyCard";
import { bookCar } from "../../redux/thunk";

const CarlySearchScreen = ({ navigation }) => {
    const CarlyData = useSelector((state) => state.CarlyData);

    const [quitVisible, setQuit] = useState(false);
    const [carlyVisible, setCarly] = useState(false);
    const [bookingHand, setBooking] = useState();
    const dispatch = useDispatch();


    const booking = (id) => {
        
        setCarly(true);
        setBooking(id);
    };

    return (
        <View style={{ flex: 1 }}>
            <HeaderBar
                title="Carly Results"
                back={() => {
                    setQuit(true);
                }}
            />
            <ConfirmBox
                visible={quitVisible}
                title={"Quit Booking Carly"}
                cancelHandler={() => setQuit(false)}
                confirmHandler={() => {
                    
                    setQuit(false);
                    navigation.popToTop();
                }}
            >
                <View
                    style={{
                        // flexDirection: "column",
                        // justifyContent: "space-between",
                        marginTop: 100,
                        marginHorizontal: 30,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            color: ThemeColors.Blue,
                            fontWeight: "bold",
                        }}
                    >
                        Do you want to stop booking a parking slot?
                    </Text>
                </View>
            </ConfirmBox>
            <ConfirmBox
                visible={carlyVisible}
                title={"Booking Carly ..."}
                cancelHandler={() => setCarly(false)}
                confirmHandler={() => {
                    dispatch(bookCar(bookingHand));
                    setQuit(false);
                    navigation.popToTop();
                }}
            ></ConfirmBox>
            <FlatList
                data={CarlyData}
                renderItem={({ item }) => (
                    <CarlyCard
                        data={item}
                        booking={booking}
                        // navigation={navigation}
                    ></CarlyCard>
                )}
            ></FlatList>
        </View>
    );
};

export default CarlySearchScreen;
