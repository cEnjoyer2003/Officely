import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import { Card, Button, Divider } from "react-native-paper";
import { ThemeColors } from "../Utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import ConfirmBox from "../Utils/ConfirmBox";
import { useState } from "react";
import HeaderBar from "../Utils/HeaderBar";
import { bookOffice } from "../../redux/thunk";

const OfficeDetailScreen = ({ route, navigation }) => {
    const startDate = useSelector(
        (state) => state.OfficeSearchOptions.StartDate
    );
    const endDate = useSelector((state) => state.OfficeSearchOptions.EndDate);
    const city = useSelector((state) => state.OfficeSearchOptions.City);

    const [confirmBoxVisible, setConfirmVisible] = useState(false);
    const [parkBoxVisible, setParkVisible] = useState(false);

    const dispatch = useDispatch();
    const officeData = route.params.data;

    const confirmBookingHandler = () => {
        dispatch(bookOffice());
        setConfirmVisible(false);
        setParkVisible(true);
    };

    const confirmToParklyHandler = () => {
        // dispatch(bookOffice());
        setParkVisible(false);
        // setParkVisible(true);
        navigation.push("Parkly", {});
    };

    return (
        <View>
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
                        flex: 1,
                        flexDirection: "column",
                        // alignItems: "center",
                        justifyContent: "space-between",
                        marginVertical: 10,
                    }}
                >
                    <Text style={styles.text}>Date:</Text>
                    <Text style={[styles.text, { color: ThemeColors.Blue }]}>
                        {startDate} - {endDate}
                    </Text>
                    <Divider style={styles.divider}></Divider>
                    <Text style={styles.text}>
                        City:{" "}
                        <Text style={{ color: ThemeColors.Blue }}>{city}</Text>
                    </Text>
                    <Divider style={styles.divider}></Divider>
                    <Text style={styles.text}>Office Address: </Text>
                    <Text style={[styles.text, { color: ThemeColors.Blue }]}>
                        {officeData.Address}
                    </Text>
                    <Divider style={styles.divider}></Divider>
                    <Text style={styles.text}>Price: </Text>
                    <Text style={[styles.text, { color: ThemeColors.Blue }]}>
                        {officeData.Price} PLN
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
                        flex: 1,
                        flexDirection: "column",
                        // alignItems: "center",
                        justifyContent: "space-between",
                        marginVertical: 50,
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
            <Card style={styles.card}>
                <Card.Content>
                    <Image
                        style={styles.img}
                        source={{ uri: officeData.PictureUri }}
                    />
                    <Text style={styles.title}>{officeData.Name}</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            // flex: 1,
                            justifyContent: "space-between",
                        }}
                    >
                        <View>
                            <Text>
                                <Ionicons name="location" style={styles.icon} />
                                {officeData.Address}
                            </Text>
                            <Text>
                                <Ionicons name="star" style={styles.icon} />
                                {officeData.Rating}
                            </Text>
                            <Text>
                                <Ionicons name="wifi" style={styles.icon} />
                                {officeData.wifi ? "Wi-Fi" : x}
                            </Text>
                            <Text>
                                <Ionicons name="mail" style={styles.icon} />
                                {officeData.Contact}
                            </Text>
                        </View>

                        <Text style={styles.subtitle}>
                            PLN {officeData.Price}
                        </Text>
                    </View>
                    <Button
                        style={{ marginTop: 10 }}
                        mode="elevated"
                        onPress={() => {
                            setConfirmVisible(true);
                        }}
                    >
                        Book
                    </Button>
                </Card.Content>
            </Card>
        </View>
    );
};
const styles = StyleSheet.create({
    card: {
        marginVertical: 4,
        backgroundColor: ThemeColors.PureWhite,
        overflow: "hidden",
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
    },
    text: {
        fontSize: 20,
    },
    icon: {
        margin: 10,
    },
    img: {
        marginRight: -18,
        marginLeft: -18,
        marginTop: -20,

        width: Dimensions.get("window").width,
        height: 200,
    },
    divider: {
        height: 1,
        color: ThemeColors.Black,
    },
});
export default OfficeDetailScreen;
