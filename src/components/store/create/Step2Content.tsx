import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Colors } from "@/src/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

interface Step2Props {
  storeForm: {
    name: string;
    thumbnail: string;
    password: string;
  };
  handleChange: (field: string, value: string) => void;
  onPasswordComplete?: (password: string) => void;
  passwordLength?: number;
}

const Step2Content = ({
  storeForm,
  handleChange,
  onPasswordComplete,
  passwordLength = 5,
}: Step2Props) => {
  const [password, setPassword] = useState<string>("");

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const handlePasswordInput = (digit: string) => {
    if (password.length < passwordLength) {
      const newPassword = password + digit;
      handleChange("password", newPassword);
      setPassword(newPassword);

      if (newPassword.length === passwordLength) {
        onPasswordComplete?.(newPassword);
      }
    }
  };

  const handleBackspace = () => {
    setPassword(password.slice(0, -1));
  };

  const renderPasswordDots = () => {
    const dots = [];

    for (let i = 0; i < passwordLength; i++) {
      const isActive = i < password.length;
      const isCurrent = i === password.length;

      dots.push(
        <View
          key={i}
          style={[
            step2Styles.passwordDot,
            {
              backgroundColor: colors.background.primary,
              borderColor: isCurrent ? colors.primary[500] : colors.gray[300],
            },
            isActive && {
              backgroundColor: colors.primary[500],
              borderColor: colors.primary[500],
            },
          ]}
        >
          {isActive && (
            <Text
              style={[
                step2Styles.passwordDigit,
                { color: colors.text.inverse },
              ]}
            >
              {password[i]}
            </Text>
          )}
        </View>,
      );
    }

    return dots;
  };

  const renderKeypadButton = (digit: string) => (
    <TouchableOpacity
      key={digit}
      style={[
        step2Styles.keypadButton,
        { backgroundColor: colors.background.primary },
      ]}
      onPress={() => handlePasswordInput(digit)}
      activeOpacity={0.7}
    >
      <Text
        style={[step2Styles.keypadButtonText, { color: colors.text.primary }]}
      >
        {digit}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[
        step2Styles.container,
        { backgroundColor: colors.background.primary },
      ]}
    >
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      <View style={step2Styles.passwordSection}>
        <View style={step2Styles.passwordContainer}>
          {renderPasswordDots()}
        </View>
      </View>

      <View style={step2Styles.keypadContainer}>
        <View style={step2Styles.keypadRow}>
          {renderKeypadButton("1")}
          {renderKeypadButton("2")}
          {renderKeypadButton("3")}
        </View>
        <View style={step2Styles.keypadRow}>
          {renderKeypadButton("4")}
          {renderKeypadButton("5")}
          {renderKeypadButton("6")}
        </View>
        <View style={step2Styles.keypadRow}>
          {renderKeypadButton("7")}
          {renderKeypadButton("8")}
          {renderKeypadButton("9")}
        </View>
        <View style={step2Styles.keypadRow}>
          <View style={step2Styles.keypadButton} />
          {renderKeypadButton("0")}
          <TouchableOpacity
            style={step2Styles.keypadButton}
            onPress={handleBackspace}
            activeOpacity={0.7}
          >
            <Text
              style={[
                step2Styles.keypadButtonText,
                { color: colors.text.primary },
              ]}
            >
              ⌫
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const step2Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 40,
    marginBottom: 60,
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
  passwordSection: {
    marginBottom: 80,
  },
  passwordLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 24,
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  passwordDot: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  passwordDigit: {
    fontSize: 20,
    fontWeight: "600",
  },
  keypadContainer: {
    flex: 1,
    justifyContent: "center",
    maxHeight: 300,
  },
  keypadRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
    gap: 40,
  },
  keypadButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  keypadButtonText: {
    fontSize: 24,
    fontWeight: "400",
  },
});

export default Step2Content;
