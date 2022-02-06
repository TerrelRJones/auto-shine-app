import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  title: string;
};

const SmallTextTitle = ({ title }: Props) => {
  return (
    <>
      <Text style={styles.text}>{title}</Text>
    </>
  );
};

export default SmallTextTitle;

const styles = StyleSheet.create({
  text: { fontSize: 20, fontWeight: "500", color: "lightgray" },
});
