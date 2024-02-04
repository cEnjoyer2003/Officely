import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileHomeScreen from "./ProfileHomeScreen";
import BookingDetailScreen from "./BookingDetailScreen";

const Stack = createNativeStackNavigator();

const ProfileTab = () => {
    return (
        <Stack.Navigator
            initialRouteName="Profile"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Profile" component={ProfileHomeScreen} />
            <Stack.Screen
                name="BookingDetail"
                component={BookingDetailScreen}
            />
        </Stack.Navigator>
    );
};

export default ProfileTab;
