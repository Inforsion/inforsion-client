import { View } from "react-native";

interface IOSStatusBarCoverProps {
  insets: {
    top: number;
  };
}

const StatusBarCover = ({ insets }: IOSStatusBarCoverProps) => {
  return (
    <View
      style={{
        height: insets.top,
        backgroundColor: "#ffffff",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    />
  );
};

export default StatusBarCover;
