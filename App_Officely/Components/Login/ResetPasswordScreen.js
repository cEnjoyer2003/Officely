import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { ThemeColors } from "../Utils/Colors";

const ResetPasswordScreen = () => {
    const [email, setEmail] = useState("");
    const [oldPW, setOld] = useState("");
    const [newPW, setNew] = useState("");
    const [confirmedPW, setConfirmed] = useState("");
    // TODO check input
    return (
        <View style={styles.container}>
            <Text>Reset Password</Text>
            <TextInput
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                label="Old Password"
                value={oldPW}
                secureTextEntry={true}
                onChangeText={(text) => setOld(text)}
            />
            <TextInput
                label="New Password"
                value={newPW}
                secureTextEntry={true}
                onChangeText={(text) => setNew(text)}
            />
            <TextInput
                label="Confrim Password"
                value={confirmedPW}
                secureTextEntry={true}
                onChangeText={(text) => setConfirmed(text)}
            />
            <Button mode="elevated" onPress={() => {}}>
                Lesss go
            </Button>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        // alignItems: "center",
        // justifyContent: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "700", //TODO : NOT working here
    },
    text: {
        fontSize: 20,
    },
    link: {
        // fontSize: 20,
        color: ThemeColors.Blue,
        textDecorationLine: "underline",
    },
});

export default ResetPasswordScreen;
