import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

import { Body, Container } from "../../components";

const ResheduleAppointmentScreen = ({ navigation }) => {
  const HomeState = useSelector((state) => state.HomeReducer);
  const { selectedAppointment } = HomeState;
  return (
    <Container>
      <Body navigation={navigation}></Body>
    </Container>
  );
};

export default ResheduleAppointmentScreen;

const styles = StyleSheet.create({});
