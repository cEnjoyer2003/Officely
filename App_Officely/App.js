// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";
import store from "./redux/store";
import AppNavigator from "./Components/AppNavigator";
import { ThemeColors } from "./Components/Utils/Colors";



export default function App() {
    return (
        <Provider store={store}>
            <PaperProvider theme={theme}>
                {/* <NavigationContainer> */}
                    <AppNavigator></AppNavigator>
                {/* </NavigationContainer> */}
            </PaperProvider>
        </Provider>
    );
}

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        secondaryContainer: ThemeColors.Orange,
    },
};
