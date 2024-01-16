import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import OfficeTab from "./Office/OfficeTab";
import ProfileTab from "./Profile/ProfileTab";
import { ThemeColors } from "./Utils/color";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="OfficeTab"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "OfficeTab") {
                        iconName = focused ? "briefcase" : "briefcase-outline";
                    } else if (route.name === "ProfileTab") {
                        iconName = focused ? "person-circle" : "person-circle-outline";
                    }
                    
                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
                tabBarActiveTintColor: ThemeColors.Focus,
                tabBarInactiveTintColor: ThemeColors.Plain,
                headerShown: false,
            })}
        >
            <Tab.Screen name="OfficeTab" component={OfficeTab} />
            <Tab.Screen name="ProfileTab" component={ProfileTab} />
            {/* <Tab.Screen name="Quit" component={Quit} options={{ headerShown: false }}/> */}
        </Tab.Navigator>
    );
};

export default AppNavigator;
