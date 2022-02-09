import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Fontisto } from "@expo/vector-icons/";

import { useAuth } from "../contexts/Auth";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";

import { color } from "../components/colors";

import { useNavigation, useRoute } from "@react-navigation/native";
import Title from "../components/Title";
import SmallTextTitle from "../components/SmallTextTitle";
import ServicesRow from "../components/ServicesRow";

const API_URL = "https://auto-shine-app.herokuapp.com/api/v1";

const PaymentScreen = () => {
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { confirmPayment, loading } = useConfirmPayment();

  const auth = useAuth();

  const route = useRoute();
  const navigation = useNavigation();

  const serviceTitle = route.params.serviceTitle;
  const servicePrice = route.params.price;
  const serviceId = route.params.serviceId;
  const time = route.params.time;
  const date = route.params.date;
  const vehicle = route.params.vehicle;
  const address = route.params.address;
  const comment = route.params.comment;

  const fetchPaymentIntentClientSecret = async () => {
    setIsLoading(true);
    const res = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: `${servicePrice}00`,
      }),
    });
    const { clientSecret, error } = await res.json();
    return { clientSecret, error };
  };

  const confirmAppointment = async () => {
    if (!cardDetails?.complete || !email) {
      alert("Please enter complete card details and email");
      return;
    }

    const billingDetails = {
      email: email,
    };

    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confimr payment
      if (error) {
        console.log(error);
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment confirmation error ${error.message}`);
          setIsLoading(false);
        } else if (paymentIntent) {
          navigation.navigate("Confirmation");
          // alert("Payment Successful", [
          //   { text: "OK", onPress: navigation.navigate("HomeStack") },
          // ]);

          // Setting users appoint into database
          const user = await fetch(`${auth.BASE_URL}api/v1/createAppointment`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              date: "Feb 11",
              time: "3:30",
              address: address,
              type: serviceTitle,
              vehicle: vehicle,
              comment: comment,
              appointmentId: auth.authData.userId,
            }),
          });
          const res = await user.json();
          // console.log(res);
          console.log("Payment successful", paymentIntent);
        }
      }
    } catch (e) {
      console.log(e + " " + "The end");
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator color={"#000"} animating={true} size="small" />
          </View>
        </>
      ) : (
        <>
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

            <CustomButton
              title="Pay"
              onPress={confirmAppointment}
              disabled={loading}
            />
          </View>
        </>
      )}
    </>
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
