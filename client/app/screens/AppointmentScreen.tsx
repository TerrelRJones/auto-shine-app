import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { Loading } from "../components/Loading";

import { useAuth } from "../contexts/Auth";
import SmallTextTitle from "../components/SmallTextTitle";
import Title from "../components/Title";

import { color } from "../components/colors";

const AppointmentScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>();

  const auth = useAuth();

  interface Props {
    item: any;
  }

  const appointmentCard = ({ item }: Props) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: `${color.whiteSmoke}`,
          borderRadius: 5,
          paddingVertical: 10,
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>{item.type}</Text>

          <Text style={{ marginBottom: 5 }}>3:00 PM</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>2022 BMW 545i</Text>
          <Text>FEB 11</Text>
        </View>
        {/* <Text>{item.date}</Text> */}
      </View>
    );
  };

  const getAppointments = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(
        `${auth.BASE_URL}api/v1/appointment/${auth.authData?.userId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: `${auth.authData?.token}`,
          },
        }
      );
      const appointments = await data.json();
      setAppointments(appointments);
      console.log(appointments);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (appointments.length === 0) {
    return (
      <>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <SmallTextTitle title="No appointments :(" />
        </View>
      </>
    );
  }

  return (
    <>
      <View
        style={{
          marginBottom: 20,
        }}
      >
        <Title title="Appointments" />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={appointments}
        renderItem={appointmentCard}
        keyExtractor={(item) => item.id}
        refreshing={isLoading}
        onRefresh={getAppointments}
      />
    </>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({});
