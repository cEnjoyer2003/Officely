import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { Card } from "react-native-paper";
import { ThemeColors } from "../Utils/color";

const OfficeCard = ({ data: officeData }) => {
    return (
        <TouchableOpacity> 
            {/* // TODO: Optimize animation of touching */}
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.title}>{officeData.Name}</Text>
                    <Image
                        style={styles.img}
                        source={{ uri: officeData.PictureUri }}
                    />
                    <Text>{officeData.Address}</Text>
                    <Text>{officeData.Price}</Text>
                    <Text>{officeData.Rating}</Text>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        // marginHorizontal : 8,
        marginVertical: 4,
        backgroundColor: ThemeColors.White,
    },
    title: {
        fontSize: 22,
        fontWeight: "700", //TODO : NOT working here
        // fontFamily: "monospace", //TODO : Find working font
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 22,
        fontWeight: "bold",
    },
    text: {
        fontSize: 20,
    },
    img: {
        width: 300,
        height: 200,
    },
});
export default OfficeCard;
