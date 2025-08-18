// components/Button.tsx
import { Colors } from "@/src/constants/Colors";
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
  Image,
  ImageURISource,
  ImageRequireSource,
} from "react-native";

interface ButtonProps {
  title: string;
  variant?: "primary" | "negative" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?:
    | ImageURISource
    | ImageURISource[]
    | ImageRequireSource
    | React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  size = "medium",
  disabled = false,
  onPress,
  style,
  textStyle,
  icon,
}) => {
  const isReactNodeIcon = React.isValidElement(icon);

  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[textStyles[variant], textStyle]}>{title}</Text>
      {icon && (
        <View style={styles.iconWrapper}>
          {isReactNodeIcon ? (
            icon
          ) : (
            <Image
              style={{ height: 20 }}
              source={icon as ImageURISource | ImageRequireSource}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const ButtonSizeStyles = {
  small: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  medium: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  large: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
};

const styles = StyleSheet.create({
  base: {
    ...ButtonSizeStyles.medium, // 기본 크기 설정
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    lineHeight: 16,
  },
  primary: {
    backgroundColor: Colors.light.primary["300"],
    padding: 10,
  },
  negative: {
    backgroundColor: Colors.light.error,
    padding: 10,
  },
  ghost: {
    backgroundColor: "transparent",
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.light.gray[300],
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: 20,
  },
});

const textStyles = StyleSheet.create({
  base: {
    lineHeight: 16,
  },
  primary: {
    color: Colors.light.text.inverse,
    fontWeight: "600",
  },
  negative: {
    color: Colors.light.text.inverse,
    fontWeight: "600",
  },
  ghost: {
    color: Colors.light.primary["300"],
    fontWeight: "600",
  },
});
