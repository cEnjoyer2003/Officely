import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OfficeSearchScreen from "./OfficeSearchScreen";
import OfficeResultScreen from "./OfficeResultScreen";
import OfficeDetailScreen from "./OfficeDetailScreen";
import ParklyResultScreen from "../Parkly/ParklyResultScreen";
import ParklyDetailScreen from "../Parkly/ParklyDetailScreen";

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
            <Stack.Screen name="Parkly" component={ParklyResultScreen} />
            <Stack.Screen name="ParklyDetail" component={ParklyDetailScreen} />
        </Stack.Navigator>
    );
};

export default OfficeTab;
