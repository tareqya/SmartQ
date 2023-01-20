import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Body, Container } from "../../components";
import { Images, FONTS } from "../../../assets/styles";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const AuthState = useSelector((state) => state.AuthReducer);
  const { user } = AuthState;

  return (
    <Container>
      <View style={styles.profileWrapper}>
        <Image
          source={Images.PROFILE}
          resizeMode="stretch"
          style={styles.profileImage}
        />
        <View style={styles.welcomeWrapper}>
          <Text style={FONTS.body3}>שלום לך</Text>
          <Text style={FONTS.h3}>{`${user.firstName} ${user.lastName}`}</Text>
        </View>
      </View>

      <Body></Body>
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
