import { StyleSheet, Text, View } from "react-native";
import { color } from "./colors";

interface TitleProp {
  title: string;
}

const Title = ({ title }: TitleProp) => {
  return <Text style={styles.title}>{title}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "800",
    textTransform: "capitalize",
    color: `${color.primary}`,
  },
});
