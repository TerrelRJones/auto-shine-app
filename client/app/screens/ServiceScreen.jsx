import React from "react";
import {
  Pressable,
  ScrollViewBase,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons, Fontisto } from "@expo/vector-icons/";

import serviceData from "../data/service";
import Title from "../components/Title";

// interface User {
//   firstName: string;
// }

const ServiceScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const service = serviceData.find(
    (item) => item.id === route.params.serviceId
  );
  // console.log(route.params);
  return (
    <View>
      <View style={styles.styleContainer}>
        <Pressable onPress={() => navigation.goBack()} style={styles.btn}>
          <Fontisto name="angle-dobule-left" size={24} />
        </Pressable>
        <Title title={service.product} />
      </View>
      {/* DATES  */}
      <View style={styles.datesContainer}>
        <Text style={styles.dateTitle}>Date</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.datesBtnContainer}>
            <Text style={styles.datesTitle}>Today</Text>
            <Text style={styles.datesDate}>13 Jan</Text>
          </View>
          <View style={styles.datesBtnContainer}>
            <Text style={styles.datesTitle}>Tommorow</Text>
            <Text style={styles.datesDate}>13 Jan</Text>
          </View>
          <View style={styles.datesBtnContainer}>
            <Text style={styles.datesTitle}>Friday</Text>
            <Text style={styles.datesDate}>14 Jan</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  styleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  btn: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginRight: 20,
  },
  datesContainer: {},
  dateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "grey",
    marginBottom: 5,
  },
  datesBtnContainer: {
    height: 50,
    width: 120,
    borderRadius: 10,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#2C9BF0",
    backgroundColor: "black",
  },
  datesTitle: {
    color: "white",
    fontWeight: "700",
  },
  datesDate: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
});
