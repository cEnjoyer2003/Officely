import { View } from "react-native";
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

const RatingCard = () => {
    return (
        <TouchableOpacity
            disabled
            // onPress={}
        >
            <Card style={styles.card}>
                <Card.Content></Card.Content>
            </Card>
        </TouchableOpacity>
    );
};
