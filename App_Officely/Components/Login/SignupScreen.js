import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { ThemeColors } from "../Utils/Colors";

const SignupScreen = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [passwd, setPasswd] = useState("");
    const [confirmedPW, setConfirmed] = useState("");

    // TODO check input

    return (
        <View style={styles.container}>
            <Text>Sign Up</Text>
            <TextInput
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                label="First Name"
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
                label="Last Name"
                value={lastName}
                onChangeText={(text) => setLastName(text)}
            />
            <TextInput
                label="Password"
                value={passwd}
                secureTextEntry={true}
                onChangeText={(text) => setPasswd(text)}
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

export default SignupScreen;
