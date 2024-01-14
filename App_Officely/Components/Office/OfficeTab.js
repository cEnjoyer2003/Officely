import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OfficeSearch from "./OfficeSearch";

const Stack = createNativeStackNavigator();

const OfficeTab = () => {
    return (
        <Stack.Navigator initialRouteName="OfficeSearch">
            <Stack.Screen name="OfficeSearch" component={OfficeSearch} />
        </Stack.Navigator>
    );
};

export default OfficeTab;
