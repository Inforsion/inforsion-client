/**
 * Design System Colors
 * Based on the provided design tokens with gray scale and blue primary colors
 */

export const Colors = {
  light: {
    // Primary Colors (Blue Scale)
    primary: {
      50: "#EAF2FF",
      100: "#B4DBFF",
      200: "#6FBAFF",
      300: "#2897FF",
      400: "#006FFD",
      500: "#006FFD", // Main primary color
      600: "#386BF6",
    },

    // Gray Scale
    gray: {
      50: "#FFFFFF",
      100: "#F8F9FE",
      200: "#E8E9F1",
      300: "#D4D6DD",
      400: "#C5C6CC",
      500: "#C5C6CC", // Main gray color
    },

    // Semantic Colors
    success: "#2897FF", // positive (blue)
    error: "#FF7173", // negative (red/pink)
    inactive: "#9DB2CE",

    // Text Colors
    text: {
      primary: "#3D3D3D", // Font Color (dark gray)
      secondary: "#C5C6CC", // Light gray for secondary text
      inverse: "#FFFFFF", // White text for dark backgrounds
      weak: "#343434",
    },

    // Background Colors
    background: {
      primary: "#FFFFFF",
      secondary: "#F8F9FE",
      tertiary: "#E8E9F1",
    },

    // Legacy support (기존 컴포넌트 호환성)
    tint: "#006FFD",
    icon: "#C5C6CC",
    tabIconDefault: "#C5C6CC",
    tabIconSelected: "#006FFD",
  },

  dark: {
    // Primary Colors (Blue Scale - adjusted for dark mode)
    primary: {
      50: "#001A33",
      100: "#003366",
      200: "#004D99",
      300: "#0066CC",
      400: "#2897FF",
      500: "#2897FF", // Lighter blue for dark mode
      600: "#386BF6",
    },

    // Gray Scale (inverted for dark mode)
    gray: {
      50: "#151718",
      100: "#1E1E1E",
      200: "#2A2A2A",
      300: "#3D3D3D",
      400: "#5A5A5A",
      500: "#8A8A8A",
    },

    // Semantic Colors
    success: "#2897FF",
    error: "#FF7173",
    inactive: "#9DB2CE",

    // Text Colors
    text: {
      primary: "#FFFFFF",
      secondary: "#8A8A8A",
      inverse: "#151718",
    },

    // Background Colors
    background: {
      primary: "#151718",
      secondary: "#1E1E1E",
      tertiary: "#2A2A2A",
    },

    // Legacy support
    tint: "#2897FF",
    icon: "#8A8A8A",
    tabIconDefault: "#8A8A8A",
    tabIconSelected: "#2897FF",
  },
};

// 타입 정의 (TypeScript 사용 시)
export type ColorScheme = keyof typeof Colors;
export type ColorKey = keyof typeof Colors.light;
