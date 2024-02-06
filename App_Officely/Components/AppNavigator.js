import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

import OfficeTab from "./Office/OfficeTab";
import ProfileTab from "./Profile/ProfileTab";
import { ThemeColors } from "./Utils/Colors";
import LoginTab from "./Login/LoginTab";
import ConfirmBox from "./Utils/ConfirmBox";
import { quitUser } from "../redux/actions";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    const [quitConfirm, setQuitVisible] = useState(false);
    // const [quited, setQuited] = useState(true);
    const dispatch = useDispatch();
    const quited = useSelector((state) => state.UserInfo.Quited);

    const quit = () => {
        setQuitVisible(false);
        dispatch(quitUser());
    };

    const checkQuit = (event) => {
        event.preventDefault();
        setQuitVisible(true);
        // setEvent(event)
        // event.
    };

    // const quitAcc = () => {
    //     setQuitVisible(false);
    //     setQuited(true);
    //     // console.log(quitEvent.target)
    //     //TODO: QUIT ACC
    //     // quitEvent.
    // };

    return (
        <NavigationContainer>
            <ConfirmBox
                visible={quitConfirm}
                title={"Quit"}
                cancelHandler={() => setQuitVisible(false)}
                confirmHandler={quit}
            >
                <View
                    style={{
                        alignItems: "center",
                        marginHorizontal: 30,
                    }}
                >
                    <Text style={{ color: ThemeColors.Blue, fontSize: 20 }}>
                        Do you want to logout?
                    </Text>
                </View>
            </ConfirmBox>
            {quited ? (
                <LoginTab></LoginTab>
            ) : (
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
                                // case "ParkTab":
                                //     iconName = focused ? "car" : "car-outline";
                                //     break;
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
                                <Ionicons
                                    name={iconName}
                                    size={size}
                                    color={color}
                                />
                            );
                        },
                        tabBarActiveTintColor: ThemeColors.Orange,
                        tabBarInactiveTintColor: ThemeColors.LightBlue,
                        headerShown: false,
                    })}
                >
                    <Tab.Screen name="OfficeTab" component={OfficeTab} />
                    <Tab.Screen name="ProfileTab" component={ProfileTab} />
                    <Tab.Screen
                        name="Quit"
                        component={View}
                        listeners={{ tabPress: checkQuit }}
                    />
                </Tab.Navigator>
            )}
        </NavigationContainer>
        // </View>
    );
};

export default AppNavigator;
