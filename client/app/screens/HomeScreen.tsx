import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParams } from "../routes/HomeStack";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

const HomeScreen = () => {
  const [data, setData] = useState([
    {
      id: "1",
      product: "Standard Wash",
      img: require("../assets/img/wash.png"),
    },
    {
      id: "2",
      product: "Interior",
      img: require("../assets/img/interiorSeat.png"),
    },
    {
      id: "3",
      product: "Polish",
      img: require("../assets/img/polishHands.png"),
    },
    {
      id: "4",
      product: "Premium Detail",
      img: require("../assets/img/carCleanPerson.png"),
    },
  ]);

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  return (
    <>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "800",
          textTransform: "uppercase",
        }}
      >
        Hello, Terrel
      </Text>

      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          Location
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: "gray",
          }}
        >
          Tacoma, Wa
        </Text>
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 40,
        }}
      >
        Services
      </Text>
      <View style={styles.container}>
        <FlatList
          data={data}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Service")}>
              <View style={styles.serviceContainer}>
                <View
                  style={{
                    width: 100,
                    height: 100,
                  }}
                >
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    source={item.img}
                  />
                </View>
                <Text style={styles.serviceText}>{item.product}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  serviceContainer: {
    backgroundColor: "whitesmoke",
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
    marginRight: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  serviceText: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: 10,
  },
});
