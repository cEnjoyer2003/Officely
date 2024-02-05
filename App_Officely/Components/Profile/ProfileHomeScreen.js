import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "react-native-paper";
// import { Header as HeaderRNE, HeaderProps, Icon, Avatar } from "@rneui/themed";
import { Appbar, useTheme, Avatar } from "react-native-paper";

import { ThemeColors } from "../Utils/Colors";
import HeaderBar from "../Utils/HeaderBar";
import { fetchUserInfo } from "../../redux/thunk";

const ProfileHomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            // The screen is focused
            // Call any action
            dispatch(fetchUserInfo());
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    const firstName = useSelector((state) => state.UserInfo.FirstName);
    const lastName = useSelector((state) => state.UserInfo.LastName);
    const email = useSelector((state) => state.UserInfo.Email);
    const avatar = useSelector((state) => state.UserInfo.Avatar);

    return (
        <View>
            <Appbar.Header style={styles.header}>
                <View style={styles.components}>
                    <Avatar.Icon size={100} icon={avatar} />
                    <View style={styles.rightComponents}>
                        <Text style={styles.title}>
                            {firstName} {lastName}
                        </Text>
                        <Text style={styles.subtitle}>{email}</Text>
                        <Button
                            mode="elevated"
                            onPress={() => {
                                navigation.push("ResetPasswordInapp", {});
                            }}
                        >
                            change password
                        </Button>
                    </View>
                </View>
            </Appbar.Header>
        </View>
    );
};
const styles = StyleSheet.create({
    header: {
        backgroundColor: ThemeColors.LightOrange,
        height: 200,
    },
    components: {
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
    bottom: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
    },
    fab: {
        position: "absolute",
        right: 16,
    },
});

export default ProfileHomeScreen;
