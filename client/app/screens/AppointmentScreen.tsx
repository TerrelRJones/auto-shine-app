import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import "react-native-gesture-handler";
import { Swipeable } from "react-native-gesture-handler";

import { Loading } from "../components/Loading";

import { useAuth } from "../contexts/Auth";
import SmallTextTitle from "../components/SmallTextTitle";
import Title from "../components/Title";

import { color } from "../components/colors";

const AppointmentScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>();
  const appointmentLength: number = appointments.length;

  const { BASE_URL, authData } = useAuth();

  interface Props {
    item: any;
    dragX: any;
    progress: any;
    onPress: () => void;
    onRightPress: () => void;
  }

  // Slide Right Action
  const RightAction = ({ progress, dragX, onPress }: Props) => {
    const scale = dragX.interpolate({
      inputRange: [-300, 0],
      outputRange: [4, 0],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.rightActionContainer}>
          <Animated.Text
            style={[styles.actionText, { transform: [{ scale }] }]}
          >
            Cancel
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Cancel Appointment Call
  const deleteAppointment = async (id: string) => {
    await fetch(`${BASE_URL}api/v1/appointment/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: `${authData?.token}`,
      },
    });
    getAppointments();
  };

  // Appointment Card Details
  const appointmentCard = ({ item }: Props) => {
    return (
      <Swipeable
        renderRightActions={(progress, dragX) => (
          <RightAction
            progress={progress}
            dragX={dragX}
            onPress={() => deleteAppointment(`${item.id}`)}
            item={undefined}
            onRightPress={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        )}
      >
        <View style={styles.appointmentCard}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "800",
              }}
            >
              {item.type}
            </Text>

            <Text
              style={{
                marginBottom: 5,
                fontSize: 15,
                fontWeight: "800",
              }}
            >
              {item.time}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
              }}
            >
              {item.vehicle}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
              }}
            >
              {item.date}
            </Text>
          </View>
          <Text>{item.comment}</Text>
        </View>
      </Swipeable>
    );
  };

  // Get all appointments
  const getAppointments = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(
        `${BASE_URL}api/v1/appointment/${authData?.userId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: `${authData?.token}`,
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

  if (appointmentLength === 0) {
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
        <Text
          style={{
            fontSize: 20,
            color: `${color.primary}`,
            fontWeight: "bold",
          }}
        >
          You have {appointmentLength} appointment
          {appointmentLength === 1 ? null : "s"} scheduled.{" "}
        </Text>
      </View>
      <FlatList
        data={appointments}
        showsVerticalScrollIndicator={false}
        renderItem={appointmentCard}
        keyExtractor={(item) => item.id}
        refreshing={isLoading}
        onRefresh={getAppointments}
      />
    </>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  rightActionContainer: {
    backgroundColor: "#dd2c00",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 5,
    borderRadius: 5,
    height: 80,
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    textTransform: "uppercase",
  },
  appointmentCard: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 80,
    backgroundColor: `${color.white}`,
    shadowColor: `${color.secondary}`,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 5,
    marginRight: 10,
  },
});
