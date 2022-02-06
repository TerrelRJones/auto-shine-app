import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  title: string;
  text: string;
};

const ServicesRow = ({ title, text }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default ServicesRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
