import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { removeAppointment, setLoading } from "../../actions";

import { Appointment, Body, Container, CustomButton } from "../../components";
import { COLORS, FONTS } from "../../../assets/styles";

const CancelAppointmentScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const HomeState = useSelector((state) => state.HomeReducer);
  const AuthState = useSelector((state) => state.AuthReducer);
  const CommonState = useSelector((state) => state.CommonReducer);

  const { selectedAppointment } = HomeState;
  const { loading } = CommonState;
  const { user } = AuthState;

  const onComplate = () => {
    navigation.popToTop();
  };

  const handleRemove = async () => {
    dispatch(setLoading(true));
    const action = await removeAppointment(
      dispatch,
      selectedAppointment,
      user.id,
      onComplate
    );
    dispatch(action);
    dispatch(setLoading(false));
  };

  return (
    <Container>
      <Body navigation={navigation}>
        <View style={{ marginTop: 20 }}>
          <Appointment
            appointment={selectedAppointment}
            backgroundColor={COLORS.tomato}
          />

          <View style={{ marginTop: 40 }}>
            <Text style={[FONTS.body1, { textAlign: "right" }]}>
              האם אתה בטוח כי ברצונך לבטל את התור?
            </Text>
          </View>
          <View style={styles.btnsWrapper}>
            <CustomButton
              label={"בטול תור"}
              style={styles.cancelBtn}
              onPress={handleRemove}
              loading={loading}
            />
            <CustomButton
              label={"חזור"}
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </Body>
    </Container>
  );
};

export default CancelAppointmentScreen;

const styles = StyleSheet.create({
  cancelBtn: {
    backgroundColor: COLORS.tomato,
  },
  backBtn: {
    backgroundColor: COLORS.gray,
  },
  btnsWrapper: {
    flexDirection: "row-reverse",
    marginTop: 50,
  },
});
