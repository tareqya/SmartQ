import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

import { Appointment, Body, CircleView, Container } from "../../components";
import { COLORS, FONTS, Images } from "../../../assets/styles";

const CANCEL = "CANCEL";
const WAITING = "WAITING";
const RESHEDULE = "RESHEDULE";

const OPTIONS = [
  {
    value: RESHEDULE,
    title: "שינוי מועד תור",
    subTitle: "לחץ לשינוי מועד התור שנקבע לך",
    imageUrl: Images.CHANGE_TIME_IMAGE,
  },
  {
    value: CANCEL,
    title: "ביטול תור",
    subTitle: "לחץ לביטול התור שנקבע לך",
    imageUrl: Images.CANCEL_TIME_IMAGE,
  },
  {
    value: WAITING,
    title: "חפש תור קרוב",
    subTitle: "לחץ לבדיקה אם ישנו תור קרוב יותר",
    imageUrl: Images.SEARCH_TIME_IMAGE,
  },
];

const AppointmentMenuScreen = ({ navigation }) => {
  const HomeState = useSelector((state) => state.HomeReducer);
  const { selectedAppointment } = HomeState;

  const handleOptionPress = (option) => {
    switch (option.value) {
      case CANCEL:
        navigation.navigate("CancelAppointmentScreen", { title: option.title });
        break;
      case RESHEDULE:
        navigation.navigate("ResheduleAppointmentScreen", {
          title: option.title,
        });

        break;
      case WAITING:
        navigation.navigate("SearchCloserAppointmentScreen", {
          title: option.title,
        });
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
            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.optionWrapper}
                onPress={() => handleOptionPress(OPTIONS[0])}
              >
                <CircleView
                  title={OPTIONS[0].title}
                  imageUrl={OPTIONS[0].imageUrl}
                  color={COLORS.darkBlue}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.optionWrapper}
                onPress={() => handleOptionPress(OPTIONS[1])}
              >
                <CircleView
                  title={OPTIONS[1].title}
                  imageUrl={OPTIONS[1].imageUrl}
                  color={COLORS.tomato}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.optionWrapper}
                onPress={() => handleOptionPress(OPTIONS[2])}
              >
                <CircleView
                  title={OPTIONS[2].title}
                  imageUrl={OPTIONS[2].imageUrl}
                  color={COLORS.blue}
                />
              </TouchableOpacity>
            </View>
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
