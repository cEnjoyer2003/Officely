import { View, Text, StyleSheet } from "react-native";

import { Button } from "react-native-paper";
import { Header as HeaderRNE, HeaderProps, Icon, Avatar } from "@rneui/themed";

import { ThemeColors } from "../Utils/Colors";
import HeaderBar from "../Utils/HeaderBar";

const ProfileHomeScreen = () => {
    return (
        <View>
            {/* <HeaderRNE
                backgroundColor={ThemeColors.LightBlue}
                leftComponent={
                    <View style={styles.container}>
                        <Avatar
                            size={80}
                            rounded
                            source={require("../../assets/pikachu.jpg")}
                        />
                        <View>
                            <Text style={styles.text}>boxuan@gmail.com</Text>
                            <Button mode="elevated" onPress={() => {}}>
                                change password
                            </Button>
                        </View>
                    </View>
                }
                centerComponent={<View></View>}
            ></HeaderRNE> */}
            <></>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: 500,
    },
    text: {
        color: ThemeColors.White,
        fontSize: 16,
    },
});

export default ProfileHomeScreen;
