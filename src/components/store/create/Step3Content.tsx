import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface StoreForm {
  name: string;
  thumbnail?: string;
  password: string;
}

interface Step3Props {
  storeForm: StoreForm;
}

const Step3Content: React.FC<Step3Props> = ({ storeForm }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const maskPassword = (password: string): string => {
    return "●".repeat(password.length);
  };

  const InfoItem = ({
    label,
    value,
    isPassword = false,
  }: {
    label: string;
    value: string;
    isPassword?: boolean;
  }) => (
    <View style={styles.infoItem}>
      <Text style={[styles.infoLabel, { color: colors.text.secondary }]}>
        {label}
      </Text>
      <View
        style={[
          styles.infoValueContainer,
          {
            backgroundColor: colors.background.secondary,
            borderColor: colors.gray[200],
          },
        ]}
      >
        <Text
          style={[
            styles.infoValue,
            {
              color: colors.text.primary,
              fontFamily: isPassword ? "monospace" : "system",
            },
          ]}
        >
          {isPassword ? maskPassword(value) : value}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.confirmationCard,
          {
            backgroundColor: colors.background.primary,
            shadowColor: colors.text.primary,
          },
        ]}
      >
        <View style={styles.infoContainer}>
          <InfoItem label="가게 이름" value={storeForm.name} />

          <InfoItem
            label="가게 비밀번호"
            value={storeForm.password}
            isPassword={true}
          />
        </View>

        <View
          style={[
            styles.noticeContainer,
            { backgroundColor: colors.primary[50] },
          ]}
        >
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={colors.primary[600]}
          />
          <Text style={[styles.noticeText, { color: colors.primary[600] }]}>
            가게 생성 후에는 일부 정보를 수정할 수 없습니다.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  confirmationCard: {
    borderRadius: 16,
    paddingVertical: 24,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  storeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  storeIconText: {
    fontSize: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  infoContainer: {
    gap: 20,
    marginBottom: 24,
  },
  infoItem: {
    gap: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  infoValueContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "400",
  },
  noticeContainer: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    gap: 8,
  },
  noticeIcon: {
    marginRight: 12,
    marginTop: 1,
    alignItems: "center",
  },
  noticeIconText: {
    fontSize: 16,
  },
  noticeText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
});

export default Step3Content;
