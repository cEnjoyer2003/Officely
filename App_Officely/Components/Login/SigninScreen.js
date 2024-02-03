import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { ThemeColors } from "../Utils/Colors";

const SigninScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");
    // TODO check input
    return (
        <View style={styles.container}>
            <Text>Sign In</Text>
            <TextInput
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                label="Password"
                value={passwd}
                secureTextEntry={true}
                onChangeText={(text) => setPasswd(text)}
            />
            <Button mode="elevated" onPress={() => {}}>
                Lesss go
            </Button>

            <Text
                style={styles.link}
                onPress={() => {
                    navigation.push("ResetPW", {});
                }}
            >
                reset password
            </Text>
            <Text>
                No account?{" "}
                <Text
                    onPress={() => {
                        navigation.push("Signup", {});
                    }}
                    style={styles.link}
                >
                    Sign up
                </Text>
            </Text>
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
        color: ThemeColors.Main,
        textDecorationLine: "underline",
    },
});

export default SigninScreen;
