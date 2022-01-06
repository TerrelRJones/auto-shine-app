import { StyleSheet, Text, View } from "react-native";

interface TitleProp {
  title: string;
}

const Title = ({ title }: TitleProp) => {
  return <Text style={styles.title}>{title}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "800",
    textTransform: "capitalize",
  },
});
