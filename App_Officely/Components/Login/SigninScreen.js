import { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

const SigninScreen = () => {
    const [email, setEmail] = useState("");


    return (
        <View>
            <TextInput
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                label="Password"
                value={text}
                secureTextEntry={true}
                onChangeText={(text) => setText(text)}
            />
        </View>
    );
};

export default SigninScreen;
