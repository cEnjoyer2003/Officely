import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Dimensions,
    Image,
} from "react-native";
import { Card, Avatar } from "react-native-paper";
import { ThemeColors } from "../Utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Rating } from "react-native-ratings";

const RatingCard = ({ data: ratingData }) => {
    return (
        <TouchableOpacity disabled>
            {/* <Card style={styles.card}>
                <Card.Content> */}
            <View style={styles.components}>
                <View>
                    <Avatar.Icon size={50} icon={"pac-man"} />
                    <Text style={styles.text}>
                        {ratingData.userFirstName} {ratingData.userLastName}
                    </Text>
                </View>
                <View style={styles.rightComponents} pointerEvents="none">
                    <Rating
                        ratingColor={ThemeColors.Red}
                        ratingCount={5}
                        startingValue={ratingData.ratingValue}
                        fractions={1}
                        imageSize={18}
                        
                    ></Rating>
                    <Text>Rating: {ratingData.ratingValue}/5</Text>
                    <Text style={styles.text}>{ratingData.comment}</Text>
                </View>
            </View>
            {/* </Card.Content>
            </Card> */}
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: ThemeColors.White,
        // marginLeft: 5,
        // marginRight: 5,
        // marginBottom: 10,
    },
    containerList: {
        flex: 1,
        // backgroundColor: ThemeColors.White,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
    },
    header: {
        backgroundColor: ThemeColors.LightOrange,
        height: 200,
    },
    components: {
        flex: 1,
        marginLeft: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    rightComponents: {
        marginLeft: 20,
        marginRight: 20,
        flexDirection: "column",
    },
    title: {
        fontSize: 30,
        color: ThemeColors.Black,
    },
    subtitle: {
        fontSize: 16,
        marginVertical: 10,
        color: ThemeColors.Black,
    },
});

export default RatingCard;
