import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import { Card, Button } from "react-native-paper";
import { ThemeColors } from "../Utils/color";
import { useDispatch } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";

const OfficeCardDetail = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const officeData = route.params.data;

    return (
        // TODO: Optimize animation of touching
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

                    <Text style={styles.subtitle}>PLN {officeData.Price}</Text>
                </View>
                <Button
                    style={{ marginTop: 10 }}
                    mode="elevated"
                    onPress={() => {}}
                >
                    Search
                </Button>
            </Card.Content>
        </Card>
    );
};
const styles = StyleSheet.create({
    card: {
        marginVertical: 4,
        backgroundColor: ThemeColors.White,
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
});
export default OfficeCardDetail;
