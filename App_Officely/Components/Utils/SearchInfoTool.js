import { useSelector, useDispatch } from "react-redux";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { SegmentedButtons, Button, TextInput } from "react-native-paper";
import { ThemeColors } from "./color";
import Ionicons from "@expo/vector-icons/Ionicons";

const SearchInfoTool = () => {
    const startDate = useSelector((state) => state.officeStartDate);
    const endDate = useSelector((state) => state.officeEndDate);
    const city = useSelector((state) => state.officeSelectedCity);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.itemLeft}>
                <Text style={styles.label}>{city}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemMiddle}>
                <Text style={styles.smallLabel}>{startDate}</Text>
                <Text style={styles.smallLabel}>{endDate}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemRight}>
                    <Text style={{...styles.label, marginRight: 20}}>
                        <Ionicons
                            name="filter"
                            size={18}
                            color={ThemeColors.Main}
                        />
                        filters
                    </Text>
            </TouchableOpacity>
            {/* <SegmentedButtons
                style={styles.infoTool}
                onValueChange={() => null}
                buttons={[
                    {
                        value: "city",
                        label: city,
                        onPress: () => null,
                        // disabled: true,
                    },
                    {
                        value: "startDate",
                        label: startDate ,
                        onPress: () => null,
                        // disabled: true,
                    },
                    {
                        value: "endDate",
                        label: endDate,
                        onPress: () => null,
                        // disabled: true,
                    },
                ]}
            ></SegmentedButtons>  */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: ThemeColors.White,
        flex: 1,
        maxHeight: 40,
        flexDirection: "row",
        marginTop: 8,
        marginLeft: 3,
        marginRight: 3,
        marginBottom: 4,
        shadowOffset: 5,
    },
    itemLeft: {
        // marginVertical: 4,
        // marginHorizontal: 8,
        // flex: 0.3,
        width: (Dimensions.get("window").width - 6) / 3,
        backgroundColor: "#ffffff",
        borderColor: ThemeColors.Main,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    itemMiddle: {
        width: (Dimensions.get("window").width - 6) / 3,
        backgroundColor: "#ffffff",
        borderColor: ThemeColors.Main,
        borderWidth: 1,
    },
    itemRight: {
        width: (Dimensions.get("window").width - 6) / 3,
        backgroundColor: "#ffffff",
        borderColor: ThemeColors.Main,
        borderWidth: 1,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    label: {
        textAlign: "center",
        textAlignVertical: "center",
        marginTop: 7,
        fontSize: 16,
        fontWeight: "bold",
    },
    smallLabel: {
        textAlign: "center",
        textAlignVertical: "center",
        marginTop: 2,
        fontSize: 12,
        fontWeight: "bold",
    },
    button: {
        // flex: 0.3,
        width: (Dimensions.get("window").width - 40) / 3,
        marginLeft: 5,
        marginRight: 5,
    },
});

export default SearchInfoTool;
