import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { Fontisto } from "@expo/vector-icons/";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { CardField } from "@stripe/stripe-react-native";

import { color } from "../components/colors";

import { useNavigation, useRoute } from "@react-navigation/native";
import Title from "../components/Title";
import SmallTextTitle from "../components/SmallTextTitle";
import ServicesRow from "../components/ServicesRow";

const PaymentScreen = () => {
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();

  const route = useRoute();
  const navigation = useNavigation();

  const serviceTitle = route.params.serviceTitle;
  const servicePrice = route.params.price;
  const serviceId = route.params.serviceId;
  const time = route.params.time;
  const date = route.params.date;
  const vehicle = route.params.vehicle;
  const vehicleId = route.params.vehicleId;
  const address = route.params.address;

  const confirmAppointment = async () => {
    const user = await fetch(`http://localhost:4001/api/v1/createAppointment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: new Date(`2022-02-11T15:30:00+0200`),
        address: address,
        type: serviceTitle,
        vehicleId: vehicleId,
      }),
    });
  };

  return (
    <View style={{ backgroundColor: `${color.white}`, flex: 1 }}>
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
        >
          <Title title="Payment Data" />
        </View>
      </View>
      <View>
        <View style={{ marginBottom: 15 }}>
          <SmallTextTitle title="Total" />
          <Text
            style={{ fontSize: 45, fontWeight: "bold", marginBottom: 20 }}
          >{`$${servicePrice}.00`}</Text>
        </View>
        <SmallTextTitle title="Services" />
        <View style={{ marginBottom: 20, marginTop: 10 }}>
          {/* TYPE  */}
          <ServicesRow title="Type" text={serviceTitle} />

          {/* DATE  */}
          <ServicesRow title="Date" text="Feb 11" />

          {/* TIME  */}
          <ServicesRow title="Time" text="3:00 PM" />

          {/* VEHICLE  */}
          <ServicesRow title="Vehicle" text={vehicle} />

          {/* ADDRESS  */}
          <ServicesRow title="Address" text={address} />
          <Text>{vehicleId}</Text>
        </View>
        <CustomInput
          placeholder="email"
          value={email}
          setValue={setEmail}
          secureTextEntry={false}
        />
        <SmallTextTitle title="Card Info" />
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={(cardDetails) => {
            setCardDetails(cardDetails);
          }}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }}>Powered by Stripe!</Text>
        </View>
      </View>
      <CustomButton title="Pay" onPress={confirmAppointment} />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  styleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: `${color.white}`,
  },
  cardContainer: {
    height: 40,
    marginTop: 5,
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "lightgray",
  },
});
