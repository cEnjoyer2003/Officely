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
                        source={{ uri: officeData.PictureUri }}
                    />
                    <Text style={styles.title}>{officeData.Name}</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "space-between",
                        }}
                    >
                        <View>
                            <Text>
                                <Ionicons name="location" />
                                {officeData.Address}
                            </Text>
                            <Text>
                                <Ionicons name="star" />
                                {officeData.Rating}
                            </Text>
                        </View>
                        <Text style={styles.subtitle}>
                            PLN {officeData.Price}
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
        overflow: "hidden"
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
    },
    text: {
        fontSize: 20,
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
