import {
  FlatList,
  Image,
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
  LoadingBar,
  YesNoDialog,
} from "../../components";
import { BASE_URL, INFO } from "../../utils/constans";
import { useFetch } from "../../hooks";
import { COLORS, FONTS, Images, SIZES } from "../../../assets/styles";
import { replaceAppointment, showErrorMsg } from "../../actions";

const URL = `${BASE_URL}/FindCloserAppointments`;
const SearchCloserAppointmentScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [updating, setUpdating] = React.useState(false);

  const HomeState = useSelector((state) => state.HomeReducer);
  const AuthState = useSelector((state) => state.AuthReducer);

  const { selectedAppointment } = HomeState;
  const { user } = AuthState;
  const { title } = route.params;
  const [data, loading, error] = useFetch(URL, {
    kid: user.isKid,
    time: selectedAppointment.time,
    uid: user.id,
  });

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

  const handleSelectedAppointment = (appointment) => {
    setSelected(appointment);
    setVisible(true);
  };

  React.useEffect(() => {
    if (error) {
      const action = showErrorMsg("משהו השתבש נסה שוב מאוחר יותר!");
      dispatch(action);
    }
  }, [error]);

  if (loading) {
    return (
      <Container>
        <Body navigation={navigation}>
          <LoadingBar />
        </Body>
      </Container>
    );
  }

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
          {data && data.appointments.length > 0 && (
            <View style={{ marginVertical: 20 }}>
              <Text
                style={[FONTS.h1, styles.subTitle, { color: COLORS.green }]}
              >
                חדשות טובות !
              </Text>
              <Text style={[FONTS.h1, styles.subTitle]}>
                נמצא תור מוקדם יותר עבורך :
              </Text>
            </View>
          )}

          <FlatList
            data={data ? data.appointments : []}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ marginVertical: 10 }}
                activeOpacity={0.9}
                onPress={() => handleSelectedAppointment(item)}
              >
                <Appointment appointment={item} backgroundColor={COLORS.blue} />
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.emptyWrapper}>
                <Text style={styles.emptyTitle}>
                  {"סליחה אבל המערכת אינה מצאה תור מוקדם מהתור שלך."}
                </Text>

                <Image
                  source={Images.EMPTY_IMAGE}
                  style={styles.emptyImage}
                  resizeMode={"stretch"}
                />
                <Text style={styles.emptySubTitle}>
                  {
                    "במידה ויהיה תור מוקדם יותר מערכת ניהול התורים שלנו תשלח התראה."
                  }
                </Text>
              </View>
            }
          />
        </View>
      </Body>
    </Container>
  );
};

export default SearchCloserAppointmentScreen;

const styles = StyleSheet.create({
  subTitle: {
    textAlign: "right",
    color: COLORS.darkBlue,
  },
  emptyImage: {
    width: SIZES.width - 100,
    height: SIZES.width - 100,
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTitle: {
    ...FONTS.h1,
    textAlign: "right",
    color: COLORS.tomato,
    marginVertical: 20,
  },
  emptySubTitle: {
    ...FONTS.h2,
    textAlign: "right",
    marginTop: 20,
    color: COLORS.darkBlue,
  },
});
