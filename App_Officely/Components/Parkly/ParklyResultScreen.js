import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";

import HeaderBar from "../Utils/HeaderBar";
import ConfirmBox from "../Utils/ConfirmBox";
import SearchInfoTool from "../Utils/SearchInfoTool";
import { ThemeColors } from "../Utils/Colors";

const ParklySearchScreen = ({ navigation }) => {
    const [quitVisible, setQuit] = useState(false);
    return (
        <View style={{ flex: 1 }}>
            <HeaderBar
                title="Parkly Results"
                back={() => {
                    setQuit(true);
                }}
            />
            <ConfirmBox
                visible={quitVisible}
                title={"Quit Booking Parkly"}
                cancelHandler={() => setQuit(false)}
                confirmHandler={() => {
                    setQuit(false);
                    navigation.popToTop();
                }}
            >
                <View
                    style={{
                        // flexDirection: "column",
                        // justifyContent: "space-between",
                        marginTop: 100,
                        marginHorizontal: 30,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            color: ThemeColors.Blue,
                            fontWeight: "bold",
                        }}
                    >
                        Do you want to stop booking a parking slot?
                    </Text>
                </View>
            </ConfirmBox>
            <SearchInfoTool filterHandler={()=>{}}></SearchInfoTool>

        </View>
    );
};

export default ParklySearchScreen;
