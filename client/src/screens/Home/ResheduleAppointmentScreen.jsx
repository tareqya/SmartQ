import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Appointment,
  Body,
  Container,
  DatePicker,
  YesNoDialog,
} from "../../components";
import { COLORS, FONTS } from "../../../assets/styles";
import { BASE_URL, INFO } from "../../utils/constans";
import useFetch from "../../hooks/useFetch";
import { replaceAppointment, showErrorMsg } from "../../actions";

const URL = `${BASE_URL}/GetAvailableAppointmentsByDate`;

const ResheduleAppointmentScreen = ({ navigation, route }) => {
  const [visible, setVisible] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [updating, setUpdating] = React.useState(false);

  const dispatch = useDispatch();
  const HomeState = useSelector((state) => state.HomeReducer);
  const AuthState = useSelector((state) => state.AuthReducer);

  const { selectedAppointment } = HomeState;
  const { title } = route.params;
  const { user } = AuthState;

  const [data, loading, error, setParams] = useFetch(URL, {
    kid: user.isKid,
    time: new Date().getTime(),
    uid: user.id,
  });

  const handleSelectedDate = (date) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0);

    if (date < currentDate) {
      const action = showErrorMsg("לא ניתן לבחור תור בתאריך שעבר!");
      dispatch(action);
      return;
    }
    setParams({ kid: user.isKid, time: date.getTime(), uid: user.id });
  };

  const handleSelectedAppointment = (appointment) => {
    setSelected(appointment);
    setVisible(true);
  };

  const onComplate = () => {
    navigation.popToTop();
  };

  const onDissmis = () => {
    setSelected(null);
    setVisible(false);
  };

  const handleYesPress = async () => {
    if (updating) return;
    setUpdating(true);
    const action = await replaceAppointment(
      dispatch,
      selectedAppointment,
      selected,
      user.id,
      user.isKid,
      onComplate
    );
    dispatch(action);
    setUpdating(false);
  };

  React.useEffect(() => {
    if (error) {
      const action = showErrorMsg("משהו השתבש נסה שוב מאוחר יותר!");
      dispatch(action);
    }
  }, [error]);

  return (
    <Container>
      <YesNoDialog
        msg={"האם אתה בטוח כי ברצונך להחליף את התור?"}
        msgType={INFO}
        visible={visible}
        onDissmis={onDissmis}
        yesPress={handleYesPress}
        noPress={onDissmis}
        loading={updating}
      />
      <Body navigation={navigation} title={title}>
        <View>
          <View>
            <Text style={[FONTS.h1, { textAlign: "right", marginTop: 20 }]}>
              בחר תאריך
            </Text>
            <DatePicker
              onSelect={handleSelectedDate}
              style={styles.datePicker}
            />
          </View>
          <View>
            {loading && (
              <ActivityIndicator size={"large"} color={COLORS.darkBlue} />
            )}
            {loading == false &&
              data != null &&
              data.appointments.length == 0 && (
                <Text style={styles.emptyTitle}>
                  {"סליחה אבל המערכת אינה מצאה תורים בתאריך שנבחר."}
                </Text>
              )}

            {loading == false &&
              data != null &&
              data.appointments.length > 0 && (
                <Text style={[FONTS.h1, styles.appointmentsTitle]}>
                  בחר תור :
                </Text>
              )}
            <FlatList
              data={data ? data.appointments : []}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => handleSelectedAppointment(item)}
                  activeOpacity={0.7}
                  style={{ marginVertical: 10 }}
                >
                  <Appointment appointment={item} />
                </TouchableOpacity>
              )}
            />
          </View>
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
  emptyTitle: {
    ...FONTS.h1,
    textAlign: "right",
    color: COLORS.tomato,
    marginVertical: 20,
  },
  appointmentsTitle: {
    textAlign: "right",
    marginVertical: 10,
    color: COLORS.darkBlue,
  },
});
