import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    FlatList,
} from "react-native";
import { Card, Button, Divider } from "react-native-paper";
import { ThemeColors } from "../Utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import ConfirmBox from "../Utils/ConfirmBox";
import { useState, useEffect } from "react";
import HeaderBar from "../Utils/HeaderBar";
import { bookOffice, fetchRating } from "../../redux/thunk";
import RatingCard from "../Rating/RatingCard";
import { calculateCost } from "../Utils/utils";

const OfficeDetailScreen = ({ route, navigation }) => {
    const startDate = useSelector(
        (state) => state.OfficeSearchOptions.startDate
    );
    const endDate = useSelector((state) => state.OfficeSearchOptions.endDate);
    const city = useSelector((state) => state.OfficeSearchOptions.city);
    const ratings = useSelector((state) => state.RatingData.ratings);
    const officeData = route.params.data;

    const [cost, setCost] = useState(
        calculateCost(startDate, endDate, officeData.price)
    );
    const [confirmBoxVisible, setConfirmVisible] = useState(false);
    const [parkBoxVisible, setParkVisible] = useState(false);

    const dispatch = useDispatch();

    const confirmBookingHandler = () => {
        dispatch(
            bookOffice({
                officeId: officeData.officeId,
                startDate: startDate,
                endDate: endDate,
            })
        );
        setConfirmVisible(false);
        setParkVisible(true);
    };

    const confirmToParklyHandler = () => {
        setParkVisible(false);
        // setParkVisible(true);
        navigation.push("Parkly", {});
    };
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            // The screen is focused
            // Call any action
            dispatch(fetchRating(officeData.officeId));
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    useEffect(() => {
        setCost(calculateCost(startDate, endDate, officeData.price));
    }, []);

    return (
        <View style={styles.container}>
            <HeaderBar
                title={"Office"}
                back={() => navigation.pop()}
            ></HeaderBar>
            <ConfirmBox
                visible={confirmBoxVisible}
                title={"Confirm Booking..."}
                cancelHandler={() => setConfirmVisible(false)}
                confirmHandler={confirmBookingHandler}
            >
                <View
                    style={{
                        marginTop: 40,
                        marginHorizontal: 30,
                    }}
                >
                    <Text style={styles.text}>Date:</Text>
                    <Text style={[styles.text, { color: ThemeColors.Blue }]}>
                        {startDate} - {endDate}
                    </Text>
                    <Divider style={styles.divider}></Divider>
                    <Text style={styles.text}>City:</Text>
                    <Text style={{ color: ThemeColors.Blue }}>{city}</Text>
                    <Divider style={styles.divider}></Divider>
                    <Text style={styles.text}>Office Address: </Text>
                    <Text style={[styles.text, { color: ThemeColors.Blue }]}>
                        {officeData.officeAddress}
                    </Text>
                    <Divider style={styles.divider}></Divider>
                    <Text style={styles.text}>Cost: </Text>
                    <Text style={[styles.text, { color: ThemeColors.Blue }]}>
                      $ {cost} 
                    </Text>
                    <Divider style={styles.divider}></Divider>
                </View>
            </ConfirmBox>
            <ConfirmBox
                visible={parkBoxVisible}
                title={
                    <>
                        <Ionicons name="checkmark-circle-outline" size={24} />
                        {"Booked Successfully"}
                    </>
                }
                cancelHandler={() => setParkVisible(false)}
                confirmHandler={confirmToParklyHandler}
            >
                <View
                    style={{
                        // flex: 1,
                        // flexDirection: "column",
                        // // alignItems: "center",
                        // justifyContent: "space-between",
                        marginVertical: 50,
                        marginHorizontal: 30,
                    }}
                >
                    <Text style={styles.text}>
                        Office booked successfully! You can now see your booking
                        in your profile page.
                    </Text>
                    <Text
                        style={[
                            styles.text,
                            { color: ThemeColors.Blue, fontWeight: "bold" },
                        ]}
                    >
                        Do you want to book a parking slot near the office?
                    </Text>
                </View>
            </ConfirmBox>

            <View style={styles.card}>
                {/* <Card style={styles.card}>
                <Card.Content> */}
                <Image style={styles.img} source={{ uri: officeData.image }} />
                <View
                    style={{
                        marginHorizontal: 10,
                        marginTop: 5,
                        flex: 1,
                        flexDirection: "column",
                    }}
                >
                    <Text style={styles.title}>{officeData.officeName}</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            // flex: 1,
                            justifyContent: "space-between",
                        }}
                    >
                        <View>
                            <Text style={styles.text}>
                                <Ionicons
                                    name="navigate-circle"
                                    style={styles.icon}
                                />
                                {city}
                            </Text>
                            <Text style={styles.text}>
                                <Ionicons name="location" style={styles.icon} />
                                {officeData.officeAddress}
                            </Text>
                            {/* <Text>
                                <Ionicons name="star" style={styles.icon} />
                                {officeData.Rating}
                            </Text> */}

                            <Text style={styles.text}>
                                <Ionicons name="mail" style={styles.icon} />
                                {officeData.contactInfo}
                            </Text>
                            <Text style={styles.text}>
                                <Ionicons
                                    name={officeData.wifi ? "wifi" : "alert"}
                                    style={styles.icon}
                                />
                                {officeData.wifi ? "Wi-Fi" : "No Wi-fi"}
                            </Text>
                            <Text style={[styles.text]}>
                                <Ionicons style={styles.icon} name="business" />
                                {officeData.facilities}
                            </Text>
                            <Text style={styles.text}>
                                <Ionicons style={styles.icon} name="people" />
                                {officeData.capacity}
                            </Text>
                            <Text style={[styles.text]}>
                                <Ionicons style={styles.icon} name="card" />
                                $ {officeData.price} / day
                            </Text>
                        </View>
                    </View>
                    {/* <View> officeData.price*/}
                    <Divider></Divider>
                    <Text style={[styles.subtitle, { fontSize: 22, textAlign: "left" }]}>
                        Reviews:
                    </Text>
                    <FlatList
                        data={ratings}
                        renderItem={({ item }) => (
                            <RatingCard
                                data={item}
                                // navigation={navigation}
                            ></RatingCard>
                        )}
                    ></FlatList>
                </View>
                {/* </View> */}
                <View style={[styles.bottom]}>
                    <View>
                        <Text style={[styles.subtitle, { fontSize: 18 }]}>
                            {startDate} ~ {endDate}
                        </Text>
                        <Text style={styles.subtitle}>
                           $ {cost.toFixed(2)}
                        </Text>
                    </View>
                    <Button
                        style={{ width: 120 }}
                        mode="elevated"
                        onPress={() => {
                            setConfirmVisible(true);
                        }}
                    >
                        Book
                    </Button>
                </View>
                {/* </Card.Content> */}
                {/* </Card> */}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: ThemeColors.PureWhite,
    },
    card: {
        flex: 1,
        flexDirection: "column",
        // marginHorizontal: 15,
        marginVertical: 0,
        overflow: "hidden",
    },
    bottom: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: 10,
        marginHorizontal: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "700", //TODO : NOT working here
        // fontFamily: "monospace", //TODO : Find working font
    },
    subtitle: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "right",
        textAlignVertical: "bottom",
        color: ThemeColors.Blue,
    },
    text: {
        fontSize: 16,
    },
    icon: {
        color: ThemeColors.Blue,
        fontSize: 16,
    },

    img: {
        // marginRight: -18,
        // marginLeft: -18,
        // marginTop: -20,
        width: Dimensions.get("window").width,
        height: 200,
    },
    divider: {
        height: 1,
        color: ThemeColors.Black,
    },
});
export default OfficeDetailScreen;
