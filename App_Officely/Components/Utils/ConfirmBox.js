import { Text, View, StyleSheet } from "react-native";
import { Button, Modal, Card, Portal } from "react-native-paper";
import { ThemeColors } from "./Colors";

const ConfirmBox = ({
    children,
    title,
    visible,
    cancelHandler,
    confirmHandler,
    cancelLabel,
    confirmLabel,
}) => {
    return (
        <Portal>
            <Modal
                style={styles.container}
                visible={visible}
                onDismiss={cancelHandler}
            >
                <Card style={styles.card}>
                    <Card.Content >
                        <View style={styles.components}>
                            <Text style={styles.title}>{title}</Text>
                            {children}
                        </View>
                        <View style={styles.bottom}>
                            <View style={styles.inline}>
                                <Button
                                    style={styles.button}
                                    mode="elevated"
                                    onPress={cancelHandler}
                                >
                                    {cancelLabel ? cancelLabel : "Cancel"}
                                </Button>
                                <Button
                                    style={styles.button}
                                    mode="elevated"
                                    onPress={confirmHandler}
                                >
                                    {confirmLabel ? confirmLabel : "Confirm"}
                                </Button>
                            </View>
                        </View>
                    </Card.Content>
                </Card>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "space-between",
        marginTop: 150,
        // backgroundColor: ThemeColors.PureWhite,
        // padding: 20,
        height: 380,
        // : "center",
    },
    card:{
        backgroundColor: ThemeColors.PureWhite,
        width: 350,
        flexDirection: "column",
        alignItems: "center",
    },
    components: {
        flex: 1,
        // flexDirection: "column",
        // alignItems: "baseline",
        alignSelf:"stretch",
        justifyContent: "space-between",
        width: 350,
        backgroundColor: ThemeColors.PureWhite,
    },

    bottom: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        marginHorizontal: 30,
    },
    title: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
    },
    inline: {
        height: 50,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    },
});

export default ConfirmBox;
