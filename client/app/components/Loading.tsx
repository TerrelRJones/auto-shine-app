import React from "react";
import { View, ActivityIndicator } from "react-native";
import { color } from "./colors";

export const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: `${color.white}`,
      }}
    >
      <ActivityIndicator color={"000"} animating={true} size={"large"} />
    </View>
  );
};
