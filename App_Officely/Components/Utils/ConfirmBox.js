import { Text, View, StyleSheet } from "react-native";
import { Button, Modal, Card, Portal } from "react-native-paper";
import { ThemeColors } from "./Colors";

const ConfirmBox = ({
    children,
    title,
    visible,
    cancelHandler,
    confirmHandler,
}) => {
    return (
        <Portal>
            <Modal
                style={styles.container}
                visible={visible}
                onDismiss={cancelHandler}
            >
                <Card style={styles.components}>
                    <Card.Content>
                        <Text style={styles.title}>{title}</Text>
                        {children}
                        <View style={styles.inline}>
                            <Button mode="elevated" onPress={cancelHandler}>
                                Cancel
                            </Button>
                            <Button mode="elevated" onPress={confirmHandler}>
                                Confirm
                            </Button>
                        </View>
                    </Card.Content>
                </Card>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        // backgroundColor: ThemeColors.PureWhite,
        // padding: 20,
        height: 500,
        // : "center",
    },
    components: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginTop: 150,
        height: 500,
        width: 300,
        backgroundColor: ThemeColors.PureWhite,
        // marginTop: 50,
        // marginBottom: 50,
        // marginHorizontal: 20,
    },
    title: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
    },
    inline: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
    },
});

export default ConfirmBox;
