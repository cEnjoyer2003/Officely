import { useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button, TextInput, Divider } from "react-native-paper";

import { ThemeColors } from "../Utils/Colors";

const ResetPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [oldPW, setOld] = useState("");
    const [newPW, setNew] = useState("");
    const [confirmedPW, setConfirmed] = useState("");
    // TODO check input
    const [showPW, setShowPW] = useState(false);
    const dispatch = useDispatch();

    const reset = () => {
        // dispatch();
        navigation.popToTop();
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Reset Password</Text>
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
                    label="Old Password"
                    value={oldPW}
                    secureTextEntry={!showPW}
                    onChangeText={(text) => setOld(text)}
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
                    label="New Password"
                    value={newPW}
                    secureTextEntry={!showPW}
                    onChangeText={(text) => setNew(text)}
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
                        newPW !== confirmedPW ? ThemeColors.Red : null
                    }
                    underlineColor={
                        newPW !== confirmedPW ? ThemeColors.Red : null
                    }
                    label="Confrim New Password"
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
                {newPW !== confirmedPW ? (
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
                        newPW !== confirmedPW ||
                        email === "" ||
                        oldPW === "" ||
                        newPW === ""
                    }
                    onPress={reset}
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

export default ResetPasswordScreen;
