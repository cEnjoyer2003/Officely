import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Dimensions,
    Image,
} from "react-native";
import { Card, Divider } from "react-native-paper";
import { ThemeColors } from "../Utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

import { DatetimeToDate } from "../Utils/utils";

const BookingCard = ({ data: bookingData, navigation }) => {

    const startDate = DatetimeToDate(bookingData.startDateTime);
    const endDate = DatetimeToDate(bookingData.endDateTime);

    return (
        <TouchableOpacity
        onPress={() => navigation.push("BookingDetail", { data: bookingData })}
        >
            <Card style={styles.card}>
                <Card.Content>
                    <Image
                        style={styles.img}
                        source={{ uri: bookingData.office.image }}
                    />
                    <Text style={styles.title}>
                        {bookingData.office.officeName}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "space-between",
                        }}
                    >
                        <View>
                            <Text style={styles.text}>
                                <Ionicons style={styles.icon} name="location" />
                                {bookingData.office.officeAddress}
                            </Text>
                            <Text>
                                <Ionicons style={styles.icon} name="mail" />
                                {bookingData.office.contactInfo}
                            </Text>
                            <Text style={styles.text}>
                                {bookingData.office.wifi ? (
                                    <Ionicons style={styles.icon} name="wifi" />
                                ) : (
                                    <View></View>
                                )}

                                <Ionicons style={styles.icon} name="people" />
                                {bookingData.office.capacity}
                            </Text>
                        </View>
                    </View>
                    <Divider style={styles.divider}></Divider>
                    {/* <View style={styles.inline}> */}
                        <Text style={[styles.subtitle, {fontSize: 20}]}>
                            {startDate} ~ {""}
                            {endDate}
                        </Text>
                        <Text style={[styles.subtitle]}>
                            {bookingData.office.price.toFixed(2)} PLN
                        </Text>
                    {/* </View> */}
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        // marginHorizontal : 8,
        marginVertical: 4,
        backgroundColor: ThemeColors.PureWhite,
        overflow: "hidden",
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        // fontFamily: "monospace", //TODO : Find working font
        // marginBottom:5,
    },
    subtitle: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "right",
        // color: ThemeColors.Blue,
    },
    text: {
        fontSize: 16,
    },
    icon: {
        color: ThemeColors.Blue,
        fontSize: 16,
    },
    img: {
        // borderTopRightRadius: 20,
        // borderTopLeftRadius: 20,
        marginRight: -18,
        marginLeft: -18,
        marginTop: -20,

        width: Dimensions.get("window").width,
        height: 200,
    },
    inline: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
    },
    divider: {
        height: 1.5,
        backgroundColor: ThemeColors.Black,
    },
});

export default BookingCard;
