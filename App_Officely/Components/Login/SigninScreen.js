import { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button, Divider, TextInput } from "react-native-paper";
import { ThemeColors } from "../Utils/Colors";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions";
import { login } from "../../redux/thunk";

const SigninScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");
    const [showPW, setShowPW] = useState(false);
    const dispatch = useDispatch();

    const signin = () => {
        dispatch(
            login({
                email,
                password: passwd,
            })
        );
    };
    // TODO check input
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Sign In</Text>
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

                <Button
                    mode="elevated"
                    disabled={email === "" || passwd === ""}
                    onPress={signin}
                >
                    Lesss go
                </Button>
                <Divider style={{ ...styles.space, height: 10 }}></Divider>
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        style={styles.link}
                        onPress={() => {
                            navigation.push("ResetPW", {});
                        }}
                    >
                        Reset password
                    </Text>
                    <Text>
                        No account?{"  "}
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

export default SigninScreen;
