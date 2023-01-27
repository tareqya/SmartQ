import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

import { Appointment, Body, Card, Container } from "../../components";
import { FONTS, Images } from "../../../assets/styles";

const CANCEL = "CANCEL";
const WAITING = "WAITING";
const RESHEDULE = "RESHEDULE";

const OPTIONS = [
  {
    value: RESHEDULE,
    title: "שינוי מועד תור",
    subTitle: "לחץ לשינוי מועד התור שנקבע לך",
    imageUrl: Images.RESHEDULE_IMAGE,
  },
  {
    value: CANCEL,
    title: "ביטול תור",
    subTitle: "לחץ לביטול התור שנקבע לך",
    imageUrl: Images.CANCEL_IMAGE,
  },
  {
    value: WAITING,
    title: "תחפש תור קרוב יותר",
    subTitle: "לחץ לבדיקה אם ישנו תור קרוב יותר",
    imageUrl: Images.WAITING_IMAGE,
  },
];

const AppointmentMenuScreen = ({ navigation }) => {
  const HomeState = useSelector((state) => state.HomeReducer);
  const { selectedAppointment } = HomeState;

  const handleOptionPress = (option) => {
    switch (option.value) {
      case CANCEL:
        navigation.navigate("CancelAppointmentScreen");
        break;
      case RESHEDULE:
        navigation.navigate("ResheduleAppointmentScreen");

        break;
      case WAITING:
        navigation.navigate("SearchCloserAppointmentScreen");
        break;
    }
  };

  return (
    <Container>
      <Body navigation={navigation}>
        <View>
          <Appointment appointment={selectedAppointment} />
          <View style={styles.optionsWrapper}>
            <Text style={[FONTS.h2, { textAlign: "right" }]}>
              אנא בחר באחת האופציות הבאות:
            </Text>
          </View>

          <View style={{ marginTop: 10 }}>
            {OPTIONS.map((option, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index.toString()}
                style={styles.optionWrapper}
                onPress={() => handleOptionPress(option)}
              >
                <Card
                  title={option.title}
                  subTitle={option.subTitle}
                  imgUrl={option.imageUrl}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Body>
    </Container>
  );
};

export default AppointmentMenuScreen;

const styles = StyleSheet.create({
  optionsWrapper: {
    marginTop: 20,
  },
  optionWrapper: {
    marginTop: 10,
  },
});
