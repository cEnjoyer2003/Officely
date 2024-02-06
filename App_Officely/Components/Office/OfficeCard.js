import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Dimensions,
    Image,
} from "react-native";
import { Card } from "react-native-paper";
import { ThemeColors } from "../Utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const OfficeCard = ({ data: officeData, navigation }) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.push("Detail", { data: officeData })}
        >
            <Card style={styles.card}>
                <Card.Content>
                    <Image
                        style={styles.img}
                        source={{ uri: officeData.image }}
                    />
                    <Text style={styles.title}>{officeData.officeName}</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "space-between",
                            alignItems: "flex-end"
                        }}
                    >
                        <View>
                            <Text style={styles.text}>
                                <Ionicons style={styles.icon} name="location" />
                                {officeData.officeAddress}
                            </Text>
                            {/* <Text>
                                <Ionicons style={styles.icon} name="star" />
                                {officeData.Rating}
                            </Text> */}
                            <Text style={styles.text}>
                                <Ionicons style={styles.icon} name="business" />
                                {officeData.facilities.substring(0, 30)} {
                                (officeData.facilities.length >= 30)
                                    ? "..."
                                    : ""}
                            </Text>
                            <Text style={styles.text}>
                                {officeData.wifi ? (
                                    <Ionicons style={styles.icon} name="wifi" />
                                ) : (
                                    <View></View>
                                )}

                                <Ionicons style={styles.icon} name="people" />
                                {officeData.capacity}
                            </Text>
                        </View>
                        <Text style={[styles.subtitle]}>
                            {officeData.price.toFixed(0)} PLN
                        </Text>
                    </View>
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
        color: ThemeColors.Blue
    },
    text: {
        fontSize: 16,
    },
    icon: {
        color: ThemeColors.Blue,
        fontSize: 16
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
});
export default OfficeCard;
