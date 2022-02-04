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

import serviceData from "../data/service";
import Title from "../components/Title";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/Auth";
import { Loading } from "../components/Loading";

const HomeScreen = () => {
  const [userName, setUserName] = useState();
  const [token, setToken] = useState("");
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
    setUserName(res.firstName);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (!userName) {
    return <Loading />;
  }

  return (
    <>
      <Title title={`Hello, ${userName}!`} />

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
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    backgroundColor: "white",
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
