import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OfficeSearchScreen from "./OfficeSearchScreen";
import OfficeResultScreen from "./OfficeResultScreen";
import OfficeDetailScreen from "./OfficeDetailScreen";

const Stack = createNativeStackNavigator();

const OfficeTab = () => {
    return (
        <Stack.Navigator initialRouteName="Search">
            <Stack.Screen name="Search" component={OfficeSearchScreen} />
            <Stack.Screen name="Office" component={OfficeResultScreen} />
            <Stack.Screen name="Detail" component={OfficeDetailScreen} />

        </Stack.Navigator>
    );
};

export default OfficeTab;
