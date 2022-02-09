import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { HomeStackParams } from "../types";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

import { color } from "../components/colors";

import serviceData from "../data/service";

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/Auth";
import { Loading } from "../components/Loading";

const HomeScreen = () => {
  const [userName, setUserName] = useState();

  const auth = useAuth();

  // Navigation //
  // const navigation =
  //   useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const navigation = useNavigation();

  // type ServiceScreenProp = RouteProp<HomeStackParams, "Profile">;

  const serviceScreenNavigate = (serviceId) => {
    // fix props for navigate
    navigation.navigate("Service", {
      serviceId: serviceId,
    });
  };

  const getUserInfo = async () => {
    const user = await fetch(
      `${auth.BASE_URL}api/v1/user/${auth.authData.userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: auth.authData.token,
        },
      }
    );

    const res = await user.json();
    setUserName(res);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (!userName) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Hello, ${userName.firstName}!`}</Text>

      <View>
        <Text
          style={{
            fontSize: 20,
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
          {!userName.address[0]
            ? "N/A"
            : `${userName.address[0].city}, ${userName.address[0].state}`}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 30,
          marginBottom: 10,
        }}
      >
        Services
      </Text>
      <FlatList
        data={serviceData}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => serviceScreenNavigate(item.id)}>
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
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    backgroundColor: "white",
  },
  serviceContainer: {
    backgroundColor: `${color.white}`,
    shadowColor: `${color.secondary}`,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: 170, // 175
    height: 170, // 250
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  serviceText: {
    fontSize: 15,
    fontWeight: "700",
    textTransform: "uppercase",
    marginTop: 10,
    color: `${color.secondary}`,
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    color: `${color.primary}`,
  },
});
