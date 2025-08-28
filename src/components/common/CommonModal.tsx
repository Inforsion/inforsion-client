import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";

type Props = {
    visible: boolean;
    onClose: () => void;
    children?: React.ReactNode;
};

const CommonModal = ({ visible, onClose, children }: Props) => {
    return (
        <Modal animationType="slide" transparent visible={visible}>
            <View style={styles.overlay}>
                <View style={styles.modalBox}>
                    {children}
                    <View style={styles.closeBtnWrapper}>
                        <Text style={styles.closeBtn} onPress={onClose}>닫기</Text>
                    </View>
                </View>
            </View>

        </Modal>
    );
};

export default CommonModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        width: 370,
        height: 390,
    },
    closeBtnWrapper: {
        flexDirection: "row",
        justifyContent: "flex-end",
        top:10
    },
    closeBtn: {
        color: "#FF5151",
        fontSize: 14,
    },
});

