import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Body, Container, DatePicker } from "../../components";
import { COLORS, FONTS } from "../../../assets/styles";
import { BASE_URL } from "../../utils/constans";
import useFetch from "../../hooks/useFetch";
import { showErrorMsg } from "../../actions";

const URL = `${BASE_URL}/GetAvailableAppointmentsByDate`;

const ResheduleAppointmentScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const HomeState = useSelector((state) => state.HomeReducer);
  const AuthState = useSelector((state) => state.AuthReducer);

  const { selectedAppointment } = HomeState;
  const { title } = route.params;
  const { user } = AuthState;

  const [data, loading, error, setParams] = useFetch(URL, {
    kid: user.isKid,
    time: new Date().getTime(),
  });

  const handleSelectedDate = (date) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0);

    if (date < currentDate) {
      const action = showErrorMsg("לא ניתן לבחור תור בתאריך שעבר!");
      dispatch(action);
      return;
    }
    setParams({ kid: user.isKid, time: date.getTime() });
  };

  return (
    <Container>
      <Body navigation={navigation} title={title}>
        <View>
          <Text style={[FONTS.h1, { textAlign: "right", marginTop: 20 }]}>
            בחר תאריך
          </Text>
          <DatePicker onSelect={handleSelectedDate} style={styles.datePicker} />
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
