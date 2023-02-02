import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import {
  Appointment,
  Body,
  Container,
  LoadingBar,
  YesNoDialog,
} from "../../components";
import { Images, FONTS, SIZES, COLORS } from "../../../assets/styles";
import {
  cleanMsg,
  setLoading,
  fetchMyAppointements,
  setSelectedAppointment,
  resetAppointment,
  updateToken,
} from "../../actions";
import { INFO } from "../../utils/constans";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = React.useState(false);
  const [updating, setUpdating] = React.useState(false);
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  const AuthState = useSelector((state) => state.AuthReducer);
  const HomeState = useSelector((state) => state.HomeReducer);
  const CommonState = useSelector((state) => state.CommonReducer);

  const { user } = AuthState;
  const { appointments, selectedAppointment } = HomeState;
  const { loading } = CommonState;

  React.useEffect(() => {
    fetchData();
    updateNotificationToken();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const handleAppointmentPress = (appointment) => {
    const currentTime = new Date().getTime();
    if (appointment.time < currentTime) return;
    if (appointment.available == true) {
      dispatch(setSelectedAppointment(appointment));
      setVisible(true);
      return;
    }
    dispatch(setSelectedAppointment(appointment));
    navigation.navigate("AppointmentMenuScreen");
  };

  const registerForPushNotificationsAsync = async () => {
    var token = null;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("SmartQ", {
        name: "SmartQ",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return null;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    }

    return token;
  };

  const fetchData = async () => {
    dispatch(cleanMsg());
    dispatch(setLoading(true));
    const action = await fetchMyAppointements(dispatch, user.id);
    dispatch(action);
    dispatch(setLoading(false));
  };

  const updateNotificationToken = async () => {
    const token = await registerForPushNotificationsAsync();
    if (token != null) {
      const action = await updateToken(token, user.id);
      dispatch(action);
    }
  };

  const onComplate = () => {
    onDissmis();
  };

  const onDissmis = () => {
    setVisible(false);
  };

  const handleYesPress = async () => {
    if (updating) return;
    setUpdating(true);
    const action = await resetAppointment(
      dispatch,
      selectedAppointment,
      user.id,
      user.isKid,
      onComplate
    );
    dispatch(action);
    setUpdating(false);
  };

  if (loading) {
    return (
      <Container>
        <LoadingBar />
      </Container>
    );
  }
  return (
    <Container>
      <YesNoDialog
        msg={"האם אתה בטוח כי ברצונך לשחזר את התור?"}
        msgType={INFO}
        visible={visible}
        onDissmis={onDissmis}
        yesPress={handleYesPress}
        noPress={onDissmis}
        loading={updating}
      />
      <View style={styles.profileWrapper}>
        <Image
          source={Images.PROFILE}
          resizeMode="stretch"
          style={styles.profileImage}
        />
        <View style={styles.welcomeWrapper}>
          <Text style={FONTS.body2}>ברוך הבא</Text>
          <Text
            style={[FONTS.h2, { color: COLORS.darkBlue }]}
          >{`${user.firstName} ${user.lastName}`}</Text>
        </View>
      </View>

      <Body>
        <Text style={[FONTS.h2, { textAlign: "right" }]}>התורים שלי</Text>
        <FlatList
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          data={appointments}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ marginVertical: 10 }}
              activeOpacity={0.9}
              onPress={() => handleAppointmentPress(item)}
            >
              <Appointment appointment={item} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyListWrapper}>
              <Image
                source={Images.EMPTY_IMAGE}
                style={styles.emptyListImg}
                resizeMode="stretch"
              />
              <Text style={[FONTS.h1, { marginTop: 10, color: COLORS.tomato }]}>
                לא קיים תורים עבורך
              </Text>
            </View>
          }
        />
      </Body>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  profileImage: {
    width: 35,
    height: 35,
  },
  profileWrapper: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    marginHorizontal: 20,
    marginTop: Platform.OS == "ios" ? 10 : 50,
    alignItems: "center",
  },
  welcomeWrapper: {
    alignItems: "flex-end",
    marginHorizontal: 10,
  },
  emptyListImg: {
    width: SIZES.width * 0.7,
    height: SIZES.width * 0.7,
  },
  emptyListWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});
