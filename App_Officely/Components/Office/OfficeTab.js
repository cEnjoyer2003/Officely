import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OfficeSearchPage from "./OfficeSearchPage";
import OfficeResultPage from "./OfficeResultPage";
import OfficeCardDetail from "./OfficeCardDetail";

const Stack = createNativeStackNavigator();

const OfficeTab = () => {
    return (
        <Stack.Navigator initialRouteName="Search">
            <Stack.Screen name="Search" component={OfficeSearchPage} />
            <Stack.Screen name="Office" component={OfficeResultPage} />
            <Stack.Screen name="Detail" component={OfficeCardDetail} />

        </Stack.Navigator>
    );
};

export default OfficeTab;
