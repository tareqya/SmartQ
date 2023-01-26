import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Appointment, Body, Container } from "../../components";
import { Images, FONTS } from "../../../assets/styles";
import { cleanMsg, setLoading, fetchMyAppointements } from "../../actions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const AuthState = useSelector((state) => state.AuthReducer);
  const HomeState = useSelector((state) => state.HomeReducer);
  const CommonState = useSelector((state) => state.CommonReducer);

  const { user } = AuthState;
  const { appointments } = HomeState;
  const { loading } = CommonState;

  React.useEffect(() => {
    const fetchData = async () => {
      dispatch(cleanMsg());
      dispatch(setLoading(true));
      const action = await fetchMyAppointements(dispatch, user.id);
      dispatch(action);
      dispatch(setLoading(false));
    };

    fetchData();
  }, []);

  const handleAppointmentPress = () => {};

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <Container>
      <View style={styles.profileWrapper}>
        <Image
          source={Images.PROFILE}
          resizeMode="stretch"
          style={styles.profileImage}
        />
        <View style={styles.welcomeWrapper}>
          <Text style={FONTS.body2}>ברוך הבא</Text>
          <Text style={FONTS.h2}>{`${user.firstName} ${user.lastName}`}</Text>
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
              onPress={handleAppointmentPress}
            >
              <Appointment appointment={item} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View>
              <Text>לא קיים תורים עבורך</Text>
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
    marginTop: 10,
    alignItems: "center",
  },
  welcomeWrapper: {
    alignItems: "flex-end",
    marginHorizontal: 10,
  },
});
