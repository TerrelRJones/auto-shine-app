import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import Title from "../components/Title";

import { useAuth } from "../contexts/Auth";

const ProfileScreen = () => {
  const auth = useAuth();

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Title title="Profile" />
        <Pressable onPress={() => console.log("Edit button pressed")}>
          <Text style={styles.btn}>Edit</Text>
        </Pressable>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 150,
            marginTop: 15,
          }}
        >
          <View style={styles.photo}></View>
          <Text style={styles.profileName}>Terrel Jones</Text>
          <Text style={styles.locationTitle}>Tacoma, Wa</Text>
        </View>

        <View style={{ marginVertical: 15 }}>
          <Text style={styles.infoTitle}>Personal Info</Text>
          <Text style={styles.infoSubTitle}>email</Text>
          <Text style={styles.infoSubTitleData}>terrel@autoshineapp.com</Text>
          <Text style={styles.infoSubTitle}>phone</Text>
          <Text style={styles.infoSubTitleData}>123-456-7890</Text>
        </View>
        <View style={{ marginVertical: 15 }}>
          <Text style={styles.infoTitle}>Address</Text>
          <Text style={styles.infoSubTitle}>zip code</Text>
          <Text style={styles.infoSubTitleData}>98409</Text>
          <Text style={styles.infoSubTitle}>addresss 1</Text>
          <Text style={styles.infoSubTitleData}>2411 100th St Ct E</Text>
          <Text style={styles.infoSubTitle}>address 2</Text>
          <Text style={styles.infoSubTitleData}>#23D</Text>
        </View>
      </ScrollView>

      <CustomButton
        title="Sign Out"
        onPress={() => {
          auth.signOut();
        }}
      />
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  btn: {
    color: "#2C9BF0",
    fontSize: 15,
    fontWeight: "700",
  },
  photo: {
    backgroundColor: "red",
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
