import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileHomeScreen from "./ProfileHomeScreen";
import BookingDetailScreen from "./BookingDetailScreen";
import ResetPasswordScreen from "../Login/ResetPasswordScreen";

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
            <Stack.Screen
                name="ResetPasswordInapp"
                component={ResetPasswordScreen}
            />
        </Stack.Navigator>
    );
};

export default ProfileTab;
