import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SigninScreen from "./SigninScreen";
import SignupScreen from "./SignupScreen";
import ResetPasswordScreen from "./ResetPasswordScreen";

const Stack = createNativeStackNavigator();

const LoginTab = () => {
    return (
        <Stack.Navigator
            initialRouteName="Signin"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ResetPW" component={ResetPasswordScreen} />
        </Stack.Navigator>
    );
};

export default LoginTab;
