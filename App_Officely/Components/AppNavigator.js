import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import OfficeTab from "./Office/OfficeTab";
import ProfileTab from "./Profile/ProfileTab";
// import ParkTab from "./Park/ParkTab";
import { ThemeColors } from "./Utils/Colors";
import LoginTab from "./Login/LoginTab";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="OfficeTab"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case "OfficeTab":
                            iconName = focused
                                ? "briefcase"
                                : "briefcase-outline";
                            break;
                        case "ParkTab":
                            iconName = focused ? "car" : "car-outline";
                            break;
                        case "ProfileTab":
                            iconName = focused
                                ? "person-circle"
                                : "person-circle-outline";
                            break;
                        case "Quit":
                            iconName = focused
                                ? "log-out"
                                : "log-out-outline";
                            break;
                        default:
                            iconName = focused
                                ? "add-circle"
                                : "add-circle-outline";
                            break;
                    }
                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
                tabBarActiveTintColor: ThemeColors.Orange,
                tabBarInactiveTintColor: ThemeColors.LightBlue,
                headerShown: false,
            })}
        >
            <Tab.Screen name="OfficeTab" component={OfficeTab} />
            {/* <Tab.Screen name="ParkTab" component={ParkTab} /> */}
            <Tab.Screen name="ProfileTab" component={ProfileTab} />
            <Tab.Screen name="Quit" component={LoginTab} />
        </Tab.Navigator>
    );
};

export default AppNavigator;