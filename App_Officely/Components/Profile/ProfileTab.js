import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileHome from "./ProfileHome";

const Stack = createNativeStackNavigator();

const ProfileTab = () => {
    return (
        <Stack.Navigator initialRouteName="ProfileHome">
            <Stack.Screen name="ProfileHome" component={ProfileHome} />
        </Stack.Navigator>
    );
};

export default ProfileTab;
