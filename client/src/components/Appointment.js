import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS, Icons } from "../../assets/styles";
import { Divider } from "react-native-paper";
import { getDate, getTime } from "../utils/utilsFunctions";

const REMOVED = COLORS.tomato;
const ACTIVE = COLORS.green;
const PASS = COLORS.lightGray;

const Appointment = ({ appointment }) => {
  const { doctor, available, kid, time, doctorImage } = appointment;

  const appointmentStatus = () => {
    const currentTime = new Date().getTime();
    if (time < currentTime && available == false) {
      return PASS;
    }
    if (available == false) return ACTIVE;

    return REMOVED;
  };

  return (
    <View style={[styles.container, { backgroundColor: appointmentStatus() }]}>
      <View style={styles.doctorWrapper}>
        <View>
          <Text style={[FONTS.h2, { color: COLORS.white }]}>{doctor}</Text>
        </View>
        <View style={styles.imgBackground}>
          <Image
            source={{ uri: doctorImage }}
            style={styles.doctorImage}
            resizeMode="stretch"
          />
        </View>
      </View>
      <Divider />
      <View style={styles.timeWrapper}>
        <Icons.CalendarIcon color={COLORS.white} />
        <Text style={[FONTS.body2, { color: COLORS.white }]}>
          {getDate(time)}
        </Text>
        <Icons.TimeIcon color={COLORS.white} />
        <Text style={[FONTS.body2, { color: COLORS.white }]}>
          {getTime(time)}
        </Text>
      </View>
    </View>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },
  doctorImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  doctorWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  imgBackground: {
    borderRadius: 40,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    marginHorizontal: 20,
  },
  timeWrapper: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
