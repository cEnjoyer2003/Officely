import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OfficeSearchScreen from "./OfficeSearchScreen";
import OfficeResultScreen from "./OfficeResultScreen";
import OfficeDetailScreen from "./OfficeDetailScreen";
import CarlySearchScreen from "../Carly/CarlyResultScreen";

const Stack = createNativeStackNavigator();

const OfficeTab = () => {
    return (
        <Stack.Navigator
            initialRouteName="Search"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Search" component={OfficeSearchScreen} />
            <Stack.Screen name="Office" component={OfficeResultScreen} />
            <Stack.Screen name="Detail" component={OfficeDetailScreen} />
            <Stack.Screen name="Carly" component={CarlySearchScreen} />
        </Stack.Navigator>
    );
};

export default OfficeTab;
