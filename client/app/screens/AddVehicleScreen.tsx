import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import { useAuth } from "../contexts/Auth";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import SmallTextTitle from "../components/SmallTextTitle";
import NavBack from "../components/NavBack";
import { Loading } from "../components/Loading";

import { color } from "../components/colors";

import { useNavigation } from "@react-navigation/native";

const AddVehicleScreen = () => {
  const [year, setYear] = useState<string>("");
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);
  const navigation = useNavigation();
  const auth = useAuth();

  const addVehicle = async () => {
    try {
      setLoading(true);
      await fetch(`${auth.BASE_URL}api/v1/vehicle/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: `${auth.authData?.token}`,
        },
        body: JSON.stringify({
          year,
          make,
          model,
          vehicleId: `${auth.authData?.userId}`,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <NavBack title="Add Vehicle" onPress={() => navigation.goBack()} />
      <SmallTextTitle title="Year" />
      <CustomInput
        placeholder=""
        value={year}
        setValue={setYear}
        secureTextEntry={false}
      />
      <SmallTextTitle title="Make" />
      <CustomInput
        placeholder=""
        value={make}
        setValue={setMake}
        secureTextEntry={false}
      />
      <SmallTextTitle title="Model" />
      <CustomInput
        placeholder=""
        value={model}
        setValue={setModel}
        secureTextEntry={false}
      />
      <CustomButton title="Add Vehicle" onPress={addVehicle} />
    </View>
  );
};

export default AddVehicleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${color.white}`,
  },
});
