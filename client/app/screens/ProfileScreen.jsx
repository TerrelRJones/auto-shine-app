import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import React, { useEffect, useMemo, useState } from "react";
import CustomButton from "../components/CustomButton";
import Title from "../components/Title";
import MdIcons from "@expo/vector-icons/MaterialIcons";

import { useAuth } from "../contexts/Auth";
import { Loading } from "../components/Loading";
import { color } from "../components/colors";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const [userData, setUserData] = useState();
  const [vehicleData, setVehicleData] = useState([]);

  const navigation = useNavigation();

  const auth = useAuth();

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
    setUserData(res);
    setVehicleData(res.vehicle);
  };

  useMemo(() => {
    getUserInfo();
  }, [userData]);

  if (!userData) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: `${color.white}` }}>
      <View
        style={{
          flexDirection: "row",
          // alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Title title="Profile" />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Pressable
            onPress={() => navigation.push("AddVehicle")}
            style={{ marginRight: 10 }}
          >
            <MdIcons name={"drive-eta"} size={30} color={color.primary} />
          </Pressable>
          <Pressable
            onPress={() => navigation.push("AddAddress")}
            style={{ marginRight: 10 }}
          >
            <MdIcons name={"map"} size={30} color={color.primary} />
          </Pressable>
          <Pressable onPress={() => navigation.push("Edit")}>
            <MdIcons name={"person"} size={30} color={color.primary} />
          </Pressable>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 150,
            marginTop: 15,
            backgroundColor: `${color.white}`,
          }}
        >
          <View style={styles.photo}></View>
          <Text
            style={styles.profileName}
          >{`${userData.firstName} ${userData.lastName}`}</Text>
          <Text style={styles.locationTitle}>
            {/* {!userData.address[0]
              ? "N/A"
              : `${userData.address[0].city}, ${userData.address[0].state}`} */}
          </Text>
        </View>

        <View style={{ marginVertical: 15 }}>
          <Text style={styles.infoTitle}>Personal Info</Text>
          <Text style={styles.infoSubTitle}>email</Text>
          <Text style={styles.infoSubTitleData}>{`${userData.email}`}</Text>
          <Text style={styles.infoSubTitle}>phone</Text>
          <Text style={styles.infoSubTitleData}>123-456-7890</Text>
        </View>
        <View style={{ marginVertical: 15 }}>
          <Text style={styles.infoTitle}>Address</Text>
          <Text style={styles.infoSubTitle}>street</Text>
          <Text style={styles.infoSubTitleData}>
            {!userData.address[0] ? "N/A" : `${userData.address[0].street}`}
          </Text>
          <Text style={styles.infoSubTitle}>zip code</Text>
          <Text style={styles.infoSubTitleData}>
            {!userData.address[0] ? "N/A" : `${userData.address[0].zip}`}
          </Text>
        </View>

        <View style={{ marginVertical: 15 }}>
          <Text style={styles.infoTitle}>Vehicle</Text>

          {!vehicleData
            ? "N/A"
            : vehicleData.map((item, index) => (
                <View key={item.id}>
                  <Text style={styles.infoSubTitleData}>
                    {item.year} {item.make} {item.model}
                  </Text>
                </View>
              ))}
        </View>
      </ScrollView>

      <CustomButton
        title="Sign Out"
        onPress={() => {
          auth.signOut();
        }}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  btn: {
    color: `${color.primary}`,
    fontSize: 15,
    fontWeight: "700",
  },
  photo: {
    backgroundColor: `${color.primary}`,
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 25,
  },
  profileName: {
    fontSize: 25,
    fontWeight: "600",
  },
  locationTitle: {
    fontSize: 15,
    color: "grey",
    fontWeight: "600",
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 5,
  },
  infoSubTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "darkgray",
  },
  infoSubTitleData: {
    fontSize: 15,
    color: "gray",
    fontWeight: "700",
    marginBottom: 10,
  },
});
