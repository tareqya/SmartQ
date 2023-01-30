import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

import { Body, Container, DatePicker } from "../../components";
import { COLORS, FONTS } from "../../../assets/styles";

const ResheduleAppointmentScreen = ({ navigation, route }) => {
  const HomeState = useSelector((state) => state.HomeReducer);
  const { selectedAppointment } = HomeState;
  const { title } = route.params;

  const handleSelectedDate = (date) => {};

  return (
    <Container>
      <Body navigation={navigation} title={title}>
        <View>
          <Text style={[FONTS.h1, { textAlign: "right", marginTop: 20 }]}>
            בחר תאריך
          </Text>
          <DatePicker
            currentDate={new Date()}
            onSelect={handleSelectedDate}
            style={styles.datePicker}
          />
        </View>
      </Body>
    </Container>
  );
};

export default ResheduleAppointmentScreen;

const styles = StyleSheet.create({
  datePicker: {
    marginVertical: 20,
    backgroundColor: COLORS.background,
  },
});
