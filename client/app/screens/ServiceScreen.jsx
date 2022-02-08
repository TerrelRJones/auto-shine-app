import React, { useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
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

import { useAuth } from "../contexts/Auth";
import { Loading } from "../components/Loading";

const ServiceScreen = () => {
  const [userData, setUserData] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentVehicle, setAppointmentVehicle] = useState("");
  const [appointmentAddress, setAppointmentAddress] = useState("");
  const [appointmentComment, setAppointmentComment] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [selectedIdTime, setSelectedIdTime] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();
  const auth = useAuth();

  const service = serviceData.find(
    (item) => item.id === route.params.serviceId
  );

  const paymentScreenNavigate = () => {
    navigation.navigate("Payment", {
      serviceId: service.id,
      serviceTitle: service.product,
      price: service.price,
      date: appointmentDate,
      time: appointmentTime,
      vehicle: appointmentVehicle,
      address: appointmentAddress,
    });
  };

  const getUserInfo = async () => {
    const user = await fetch(
      `${auth.BASE_URL}api/v1/user/${auth.authData.userId}`,
      {
        method: "GET",
        headers: { token: auth.authData.token },
      }
    );

    const res = await user.json();
    console.log(res.vehicle);
    setUserData(res);
  };
  const SelectedBlurb = ({ item, onPress, backgroundColor, textColor }) => {
    return (
      <>
        <TouchableOpacity
          onPress={onPress}
          style={[styles.datesBtnContainer, backgroundColor]}
        >
          <Text style={[styles.datesTitle, textColor]}>{item.title}</Text>
          <Text style={[styles.datesDate, textColor]}>{item.day}</Text>
        </TouchableOpacity>
      </>
    );
  };

  const renderItemDate = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#2C9BF0" : "#000";
    const color = item.id === selectedId ? "white" : "white";

    return (
      <SelectedBlurb
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  const SelectedTimeBlurb = ({ item, onPress, backgroundColor }) => {
    return (
      <>
        <TouchableOpacity
          style={[styles.datesBtnContainer, backgroundColor]}
          onPress={onPress}
        >
          <Text style={styles.datesDate}>{item.time}</Text>
        </TouchableOpacity>
      </>
    );
  };

  const renderItemTime = ({ item }) => {
    const backgroundColor = item.id === selectedIdTime ? "#2C9BF0" : "#000";
    // const color = item.id === selectedId ? "white" : "white";
    return (
      <SelectedTimeBlurb
        item={item}
        onPress={() => setSelectedIdTime(item.id)}
        backgroundColor={{ backgroundColor }}
      />
    );
  };

  useEffect(() => {
    getUserInfo();
    // getUserId();
  }, []);

  if (userData.length === 0) {
    return <Loading />;
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
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
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={dateData}
            renderItem={renderItemDate}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        </View>
      </View>
      {/* Time */}
      <View style={styles.datesContainer}>
        <Text style={styles.dateTitle}>Time</Text>
        <View>
          <FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={serviceTimeData}
            renderItem={renderItemTime}
            keyExtractor={(item) => item.id}
            extraData={selectedIdTime}
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
          defaultButtonText="Select Vehicle"
          data={userData.vehicle}
          // data={vehicles}
          onSelect={(selectedItem, index) => {
            let car = `${selectedItem.year} ${selectedItem.make} ${selectedItem.model}`;
            setAppointmentVehicle(car);

            console.log(car);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            let car = `${selectedItem.year} ${selectedItem.make} ${selectedItem.model}`;
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return car;
          }}
          rowTextForSelection={(item, index) => {
            let car = `${item.year} ${item.make} ${item.model}`;
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return car;
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
          defaultButtonText="Select Address"
          data={userData.address}
          onSelect={(selectedItem, index) => {
            const address = `${selectedItem.street} ${selectedItem.city}, ${selectedItem.state} ${selectedItem.zip}`;
            setAppointmentAddress(address);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem.street;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item.street;
          }}
        />
      </View>
      <Text style={styles.dateTitle}>Extra Notes</Text>
      <TextInput
        style={styles.input}
        placeholder="Don't want your tires shined? Let us know here!"
      />
      <CustomButton title="CONFIRM" onPress={paymentScreenNavigate} />
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
  },
  datesTitle: {
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
