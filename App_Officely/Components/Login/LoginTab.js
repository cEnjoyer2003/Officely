import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SigninScreen from "./SigninScreen";
import SignupScreen from "./SignupScreen";
import ResetPasswordScreen from "./ResetPasswordScreen";

const Stack = createNativeStackNavigator();

const LoginTab = ({ navigation }) => {
    // useEffect(() => {
    //     navigation.setOptions({
    //         tabBarStyle: {
    //             display: "none",
    //         },
    //     });
    //     return () => {
    //         navigation.setOptions({
    //             tabBarStyle: {
    //                 display: "flex",
    //             },
    //         });
    //     };
    // }, []);
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
