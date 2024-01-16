import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { SegmentedButtons, Button, TextInput } from "react-native-paper";

const SearchInfoTool = () => {
    const startDate = useSelector((state) => state.officeStartDate);
    const endDate = useSelector((state) => state.officeEndDate);
    const city = useSelector((state) => state.officeSelectedCity);

    return (
        <View style={styles.container}>
            
            <SegmentedButtons
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
            ></SegmentedButtons> 
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: ThemeColors.White,
        // flexDirection: "row",
        marginTop: 8,
        marginLeft: 3,
        marginRight: 3,
        marginBottom: 8,

    },
    infoTool: {
        // backgroundColor: ThemeColors.White,
        // marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    label: {
        // textAlign: "center",
        // fontSize: 8,
        // color: "black",
    },
    button: {
        // flex: 0.3,
        width: (Dimensions.get("window").width - 40) / 3,
        marginLeft: 5,
        marginRight: 5,

        // fontSize: 8,
        // color: "black",
    },
});

export default SearchInfoTool;
