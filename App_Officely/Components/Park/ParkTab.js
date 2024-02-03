import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ParkSearchScreen from "./ParkSearchScreen";

const Stack = createNativeStackNavigator();

const ParkTab = () => {
    return (
        <Stack.Navigator initialRouteName="Search">
            <Stack.Screen name="Search" component={ParkSearchScreen} />
        </Stack.Navigator>
    );
};

export default ParkTab;
