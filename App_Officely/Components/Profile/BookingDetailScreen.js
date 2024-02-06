import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import { Card, Button, Divider } from "react-native-paper";
import { ThemeColors } from "../Utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

import ConfirmBox from "../Utils/ConfirmBox";
import HeaderBar from "../Utils/HeaderBar";
import { DatetimeToDate } from "../Utils/utils";
import { cancelBooking } from "../../redux/thunk";

const BookingDetailScreen = ({ route, navigation }) => {
    const [confirmBoxVisible, setConfirmVisible] = useState(false);
    const dispatch = useDispatch();
    const bookingData = route.params.data;
    const startDate = DatetimeToDate(bookingData.startDateTime);
    const endDate = DatetimeToDate(bookingData.endDateTime);

    const cancelBookingHandler = () => {
        setConfirmVisible(false);
        dispatch(cancelBooking(bookingData.bookingId));
    };
    return (
        <View style={styles.container}>
            <HeaderBar
                title={"Office"}
                back={() => navigation.pop()}
            ></HeaderBar>
            <ConfirmBox
                visible={confirmBoxVisible}
                title="Cancel Booking..."
                cancelHandler={() => setConfirmVisible(false)}
                cancelLabel="back"
                confirmHandler={cancelBookingHandler}
            >
                <View
                    style={{
                        marginVertical: 20,
                        marginHorizontal: 30
                    }}
                >
                    <Text style={styles.text}>Date:</Text>
                    <Text style={[styles.text, { color: ThemeColors.Blue }]}>
                        {startDate} - {endDate}
                    </Text>
                    <Divider style={styles.divider}></Divider>
                    <Text style={styles.text}>
                        City:
                    </Text>
                    <Text style={{ color: ThemeColors.Blue }}>{bookingData.office.city}</Text>
                    <Divider style={styles.divider}></Divider>
                    <Text style={styles.text}>Office Address: </Text>
                    <Text style={[styles.text, { color: ThemeColors.Blue }]}>
                        {bookingData.office.officeAddress}
                    </Text>
                    <Divider style={styles.divider}></Divider>
                    <Text style={styles.text}>Price: </Text>
                    <Text style={[styles.text, { color: ThemeColors.Blue }]}>
                        {bookingData.office.price} PLN
                    </Text>
                    <Divider style={styles.divider}></Divider>
                </View>
            </ConfirmBox>
            <View style={styles.card}>
                {/* <Card style={styles.card}>
                <Card.Content> */}
                <Image
                    style={styles.img}
                    source={{ uri: bookingData.office.PictureUri }}
                />
                <Text style={styles.title}>
                    {bookingData.office.officeName}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        // flex: 1,
                        justifyContent: "space-between",
                    }}
                >
                    <View>
                        <Text style={styles.text}>
                            <Ionicons name="location" style={styles.icon} />
                            {bookingData.office.officeAddress}
                        </Text>
                        <Text style={styles.text}>
                            <Ionicons name="mail" style={styles.icon} />
                            {bookingData.office.contactInfo}
                        </Text>
                        <Text style={styles.text}>
                            <Ionicons name="wifi" style={styles.icon} />
                            {bookingData.office.wifi ? "Wi-Fi" : "No Wi-fi"}
                        </Text>
                        <Text style={[styles.text]}>
                            <Ionicons style={styles.icon} name="business" />
                            {bookingData.office.facilities}
                        </Text>
                        <Text style={styles.text}>
                            <Ionicons style={styles.icon} name="people" />
                            {bookingData.office.capacity}
                        </Text>
                    </View>
                </View>
                <></>
                <View style={styles.bottom}>
                    <Text style={styles.subtitle}>
                        {bookingData.office.price.toFixed(2)} PLN
                    </Text>
                    <Button
                        style={{ marginTop: 10 }}
                        mode="elevated"
                        onPress={() => {
                            setConfirmVisible(true);
                        }}
                    >
                        Cancel
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
        marginHorizontal: 15,
        marginVertical: 0,
        overflow: "hidden",
    },
    bottom: {
        flexDirection: "column",
        alignItems: "flex-end",
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
export default BookingDetailScreen;
