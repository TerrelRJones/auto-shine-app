import React from "react";
import {
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";

import CustomButton from "../components/CustomButton";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Fontisto } from "@expo/vector-icons/";
import SelectDropdown from "react-native-select-dropdown";

import Title from "../components/Title";

import serviceData from "../data/service";
import { dateData } from "../data/dateData";
import { serviceTimeData } from "../data/serviceTimesData";

const vehicles = ["2019 Chevy Malibu", "2010 Ford Ranger"];
const address = ["2412 100th St Ct E", "2043 Silicon Ln"];

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
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Title title={service.product} />
        </View>
      </View>
      {/* DATES  */}
      <View style={styles.datesContainer}>
        <Text style={styles.dateTitle}>Date</Text>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dateData}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.datesBtnContainer}>
                <Text style={styles.datesTitle}>{item.title}</Text>
                <Text style={styles.datesDate}>{item.day}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      {/* Time */}
      <View style={styles.datesContainer}>
        <Text style={styles.dateTitle}>Time</Text>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={serviceTimeData}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.datesBtnContainer}>
                <Text style={styles.datesDate}>{item.time}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      {/* Vehicle and address selection */}
      <View style={styles.datesContainer}>
        <Text style={styles.dateTitle}>Vehicle</Text>
        <SelectDropdown
          buttonStyle={{
            backgroundColor: "black",
            borderRadius: 5,
            width: "100%",
          }}
          buttonTextStyle={{
            color: "white",
            fontSize: 20,
            fontWeight: "700",
          }}
          defaultValueByIndex={0}
          data={vehicles}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
      </View>
      <View style={styles.datesContainer}>
        <Text style={styles.dateTitle}>Address</Text>
        <SelectDropdown
          buttonStyle={{
            backgroundColor: "black",
            borderRadius: 5,
            width: "100%",
          }}
          buttonTextStyle={{
            color: "white",
            fontSize: 20,
            fontWeight: "700",
          }}
          defaultValueByIndex={0}
          data={address}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
      </View>
      <Text style={styles.dateTitle}>Extra Notes</Text>
      <TextInput
        style={styles.input}
        placeholder="Don't want your tires shined? Let us know here!"
      />
      <CustomButton title="CONFIRM" onPress={() => console.log("Pressed")} />
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
  datesContainer: {
    marginBottom: 20,
  },
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
  input: {
    height: 100,
    width: "100%",
    borderWidth: 2,
    borderRadius: 5,
  },
});
