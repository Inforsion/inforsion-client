import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import React from "react";

interface ActionCardButtonProps {
  onPress: () => void;
  title?: string;
  subTitle?: string;
}

const ActionCardButton = ({
  onPress,
  title,
  subTitle,
}: ActionCardButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.actionCard,
        { backgroundColor: Colors.light.primary[300] },
      ]}
    >
      <Text style={styles.actionCardTitle}>
        {title}
        <Entypo name="chevron-thin-right" size={12} color="white" />
      </Text>
      <Text style={styles.actionCardSubtitle}>{subTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    minHeight: 80,
  },
  actionCardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text.inverse,
    marginBottom: 8,
  },
  actionCardSubtitle: {
    fontSize: 12,
    color: Colors.light.text.inverse,
    lineHeight: 16,
    opacity: 0.9,
  },
});

export default ActionCardButton;
