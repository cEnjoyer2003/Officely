import { useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button, TextInput, Divider } from "react-native-paper";

import { ThemeColors } from "../Utils/Colors";
import { register } from "../../redux/thunk";

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [passwd, setPasswd] = useState("");
    const [confirmedPW, setConfirmed] = useState("");
    const [showPW, setShowPW] = useState(false);
    const dispatch = useDispatch();

    const signup = () => {
        dispatch(
            register({
                firstName,
                lastName,
                password: passwd,
                email,
            })
        );
        navigation.popToTop();
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Sign Up</Text>
                <Divider style={styles.divider}></Divider>
                <Divider style={{ ...styles.space, height: 50 }}></Divider>
                <TextInput
                    style={styles.input}
                    label="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Divider style={{ ...styles.space, height: 10 }}></Divider>

                <TextInput
                    style={styles.input}
                    label="First Name"
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                />
                <Divider style={{ ...styles.space, height: 10 }}></Divider>

                <TextInput
                    style={styles.input}
                    label="Last Name"
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                />
                <Divider style={{ ...styles.space, height: 10 }}></Divider>

                <TextInput
                    style={styles.input}
                    label="Password"
                    value={passwd}
                    secureTextEntry={!showPW}
                    onChangeText={(text) => setPasswd(text)}
                    right={
                        <TextInput.Icon
                            icon={showPW ? "eye-off" : "eye"}
                            onPress={() => setShowPW(!showPW)}
                        />
                    }
                />
                <Divider style={{ ...styles.space, height: 10 }}></Divider>

                <TextInput
                    style={styles.input}
                    activeUnderlineColor={
                        passwd !== confirmedPW ? ThemeColors.Red : null
                    }
                    underlineColor={
                        passwd !== confirmedPW ? ThemeColors.Red : null
                    }
                    label="Confrim Password"
                    value={confirmedPW}
                    secureTextEntry={!showPW}
                    onChangeText={(text) => setConfirmed(text)}
                    right={
                        <TextInput.Icon
                            icon={showPW ? "eye-off" : "eye"}
                            onPress={() => setShowPW(!showPW)}
                        />
                    }
                />
                {passwd !== confirmedPW ? (
                    <Text style={{ color: ThemeColors.Red }}>
                        Inconstent Password.
                    </Text>
                ) : (
                    <></>
                )}
                <Divider style={{ ...styles.space, height: 10 }}></Divider>

                <Button
                    mode="elevated"
                    disabled={
                        passwd !== confirmedPW ||
                        email === "" ||
                        firstName === "" ||
                        lastName === "" ||
                        passwd === ""
                    }
                    onPress={signup}
                >
                    Lesss go
                </Button>
                <Divider style={{ ...styles.space, height: 10 }}></Divider>
                <Button mode="elevated" onPress={() => navigation.popToTop()}>
                    Back
                </Button>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        alignItems: "baseline",
        justifyContent: "flex-start",
        flexDirection: "column",

        flex: 1,
        backgroundColor: ThemeColors.LightOrange,
    },
    box: {
        // alignItems: "baseline",
        // justifyContent: "space-evenly",
        flexDirection: "column",
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        width: Dimensions.get("window").width - 40,
        marginTop: 50,
        marginBottom: 200,
    },
    title: {
        fontSize: 40,
        fontWeight: "700", //TODO : NOT working here
        color: ThemeColors.Blue,
    },
    input: {
        backgroundColor: ThemeColors.White,
        height: 60,
    },
    text: {
        fontSize: 20,
    },
    link: {
        // fontSize: 20,
        color: ThemeColors.Blue,
        textDecorationLine: "underline",
    },
    divider: {
        height: 1.5,
        backgroundColor: ThemeColors.PureWhite,
    },
    space: {
        // height: 50,
        opacity: 0,
    },
});

export default SignupScreen;
