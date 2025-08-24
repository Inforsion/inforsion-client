import { ColorValue, View, type ViewProps } from "react-native";

import { useThemeColor } from "@/src/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  if (
    backgroundColor &&
    typeof backgroundColor === "object" &&
    "500" in backgroundColor
  ) {
    return (
      <View
        style={[{ backgroundColor: backgroundColor[500] || "" }, style]}
        {...otherProps}
      />
    );
  }

  return (
    <View
      style={[{ backgroundColor: backgroundColor as ColorValue }, style]}
      {...otherProps}
    />
  );
}
