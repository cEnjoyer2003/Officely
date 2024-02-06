import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "react-native-paper";
// import { Header as HeaderRNE, HeaderProps, Icon, Avatar } from "@rneui/themed";
import { Appbar, useTheme, Avatar } from "react-native-paper";

import { ThemeColors } from "../Utils/Colors";
import HeaderBar from "../Utils/HeaderBar";
import { fetchMyBookings, fetchUserInfo } from "../../redux/thunk";
import BookingCard from "./BookingCard";


const ProfileHomeScreen = ({ navigation }) => {
    const bookingData = useSelector((state)=>state.BookingData);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            // The screen is focused
            // Call any action
            dispatch(fetchUserInfo());
            dispatch(fetchMyBookings());
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    const firstName = useSelector((state) => state.UserInfo.FirstName);
    const lastName = useSelector((state) => state.UserInfo.LastName);
    const email = useSelector((state) => state.UserInfo.Email);
    const avatar = useSelector((state) => state.UserInfo.Avatar);

    return (
        <View style={styles.container}>
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
            <Text  style={[styles.title, {textAlign: "center"}]}>My Bookings</Text>
            <View style={styles.containerList}>
                <FlatList
                    data={bookingData}
                    renderItem={({ item }) => (
                        <BookingCard
                            data={item}
                            navigation={navigation}
                        ></BookingCard>
                    )}
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={refreshing}
                    //         onRefresh={onRefresh}
                    //         colors={["#009688"]}
                    //     />
                    // }
                ></FlatList>
            </View>
            {/* <BookingCard ></BookingCard> */}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: ThemeColors.White,
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
