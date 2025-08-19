import { Image, ImageStyle } from "expo-image";
import React from "react";

interface IconProps {
  icon: any;
  size?: number;
  color?: string;
  style?: ImageStyle;
  contentFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

const Icon = ({
  icon,
  size = 24,
  color = "black",
  style,
  contentFit = "contain",
}: IconProps) => {
  return (
    <Image
      source={icon}
      style={[
        {
          width: size,
          height: size,
          tintColor: color,
        },
        style,
      ]}
      contentFit={contentFit}
    />
  );
};

export default Icon;
