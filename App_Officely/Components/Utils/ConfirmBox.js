import { Text, View, StyleSheet } from "react-native";
import { Button, Modal, PaperProvider, Portal } from "react-native-paper";
import { ThemeColors } from "./Colors";

const ConfirmBox = ({ content, visible, cancelHandler, confirmHandler }) => {
    return (
        <Portal>
            <Modal
                style={styles.container}
                visible={visible}
                onDismiss={cancelHandler}
            >
                <Text style={{ textAlign: "center" }}>{content}</Text>
                <Button mode="elevated" onPress={cancelHandler}>
                    Cancel
                </Button>
                <Button mode="elevated" onPress={confirmHandler}>
                    Confirm
                </Button>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: ThemeColors.PureWhite,
        // padding: 20,
        marginHorizontal: 40,
        marginTop: 200,
        height: 200,

        // verticalAlign: "center",
    },
});

export default ConfirmBox;
