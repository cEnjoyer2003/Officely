// import { Header as HeaderRNE, HeaderProps, Icon, Avatar } from "@rneui/themed";
import { StyleSheet, View } from "react-native";

import { Appbar, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeColors } from "./Colors";

const HeaderBar = ({ title, style, back, navigation }) => {
    const theme = useTheme();
    return (
        <Appbar.Header style={styles.header} mode="center-aligned">
            {back ? (
                <Appbar.BackAction
                    style={styles.components}
                    color={ThemeColors.Black}
                    onPressIn={back}
                />
            ) : (
                <View style={{width: 50}}></View>
            )}
            <Appbar.Content
                style={styles.components}
                color={ThemeColors.Black}
                title={title}
            />
        </Appbar.Header>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: ThemeColors.LightOrange,

        height: 60,
        // flex: 1,
        // alignItems: "baseline",
        // marginTop : 30
    },
    components: { color: ThemeColors.White, alignContent: "center" },
    text: {},
    bottom: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
    },
    fab: {
        position: "absolute",
        right: 16,
    },
});
export default HeaderBar;
