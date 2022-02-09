import { View, Text } from "react-native";
import React from "react";
import { color } from "./colors";

type Props = {
  title: string;
};

const Heading = ({ title }: Props) => {
  return (
    <View>
      <Text
        style={{
          textTransform: "uppercase",
          fontWeight: "900",
          color: `${color.primary}`,
          fontSize: 40,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default Heading;
