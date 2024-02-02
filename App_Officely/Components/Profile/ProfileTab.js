import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileHome from "./ProfileHome";

const Stack = createNativeStackNavigator();

const ProfileTab = () => {
    return (
        <View>
            <ProfileHome></ProfileHome>
        </View>
    );
};

export default ProfileTab;
