import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { color } from "./colors";

type Props = {
  blurb: string;
};

const Blurb = ({ blurb }: Props) => {
  return (
    <View>
      <Text style={styles.blurb}>{blurb}</Text>
    </View>
  );
};

export default Blurb;

const styles = StyleSheet.create({
  blurb: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "600",
    color: `${color.secondary}`,
  },
});
