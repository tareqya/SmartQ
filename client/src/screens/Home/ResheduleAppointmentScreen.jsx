import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

import { Body, Container } from "../../components";

const ResheduleAppointmentScreen = ({ navigation, route }) => {
  const HomeState = useSelector((state) => state.HomeReducer);
  const { selectedAppointment } = HomeState;
  const { title } = route.params;
  return (
    <Container>
      <Body navigation={navigation} title={title}></Body>
    </Container>
  );
};

export default ResheduleAppointmentScreen;

const styles = StyleSheet.create({});
