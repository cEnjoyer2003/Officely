// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import store from "./redux/store";
import AppNavigator from "./Components/AppNavigator";

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <AppNavigator></AppNavigator>
            </NavigationContainer>
        </Provider>
    );
}
