import { View, Text, StyleSheet, Button } from "react-native";

import { Header as HeaderRNE, HeaderProps, Icon, Avatar } from "@rneui/themed";

import { ThemeColors } from "../Utils/color";

const ProfileHome = () => {
    return (
        <View>
            <HeaderRNE
                backgroundColor={ThemeColors.Side}
                leftComponent={
                    <View style={styles.container}>
                        <Avatar
                            size={80}
                            rounded
                            source={require("../../assets/pikachu.jpg")}
                        />
                        <View>
                            <Text style={styles.text}>boxuan@gmail.com</Text>
                            <Button title="Change Password"></Button>
                        </View>
                    </View>
                }
                centerComponent={<View></View>}
            ></HeaderRNE>
            <></>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: 500
    },
    text :{
        color: ThemeColors.White,
        fontSize: 16
    }
});

export default ProfileHome;
