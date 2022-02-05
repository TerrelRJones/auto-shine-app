import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Fontisto } from "@expo/vector-icons/";

import { useNavigation, useRoute } from "@react-navigation/native";

const PaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const serviceTitle = route.params.serviceTitle;
  const servicePrice = route.params.price;
  const serviceId = route.params.serviceId;
  const time = route.params.time;
  const date = route.params.date;
  const vehicle = route.params.vehicle;
  const address = route.params.address;

  return (
    <View>
      <View style={styles.styleContainer}>
        <Pressable onPress={() => navigation.goBack()} style={styles.btn}>
          <Fontisto name="angle-dobule-left" size={24} />
        </Pressable>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        ></View>
      </View>
      <Text>{serviceId}</Text>
      <Text>{serviceTitle}</Text>
      <Text>{`$${servicePrice}.00`}</Text>
      <Text>{time}</Text>
      <Text>{date}</Text>
      <Text>{vehicle}</Text>
      <Text>{address}</Text>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
