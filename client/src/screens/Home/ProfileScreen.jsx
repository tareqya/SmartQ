import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Images, FONTS, COLORS, Icons } from "../../../assets/styles";
import { Body, Container } from "../../components";
import { logout } from "../../actions/AuthActions";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const AuthState = useSelector((state) => state.AuthReducer);
  const { user } = AuthState;

  const handleLogout = async () => {
    const action = await logout();
    dispatch(action);
  };

  return (
    <Container>
      <Body>
        <View style={{ alignItems: "center" }}>
          <Image
            source={Images.PROFILE}
            style={styles.profileImage}
            resizeMode="stretch"
          />
          <Text
            style={FONTS.body2}
          >{`${user.firstName} ${user.lastName}`}</Text>
        </View>

        {/** form user info */}

        <View style={styles.formWrapper}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inpuTitle}>השם</Text>
            <View style={styles.inputBorder}>
              <Text style={styles.inpuText}>{user.firstName}</Text>
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inpuTitle}>שם משפחה</Text>
            <View style={styles.inputBorder}>
              <Text style={styles.inpuText}>{user.lastName}</Text>
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inpuTitle}>דוא״ל</Text>
            <View style={styles.inputBorder}>
              <Text style={styles.inpuText}>{user.email}</Text>
            </View>
          </View>
        </View>

        {/* logout btn */}
        <View style={styles.logoutWrapper}>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>התנתק</Text>
            <View style={styles.logoutIconWrapper}>
              <Icons.LogoutIcon size={20} color={COLORS.tomato} />
            </View>
          </TouchableOpacity>
        </View>
      </Body>
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileImage: {
    height: 100,
    width: 100,
  },
  formWrapper: {
    marginTop: 30,
    marginHorizontal: 24,
  },
  inpuTitle: {
    ...FONTS.h3,
    textAlign: "right",
    color: COLORS.black,
  },
  inputBorder: {
    flexDirection: "row-reverse",
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    justifyContent: "space-between",
  },
  inpuText: {
    ...FONTS.body3,
    color: COLORS.lightGray,
  },
  inputWrapper: {
    marginVertical: 10,
  },
  logoutText: {
    ...FONTS.body2,
    color: COLORS.tomato,
    marginHorizontal: 5,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutWrapper: {
    marginTop: 10,
    marginHorizontal: 20,
    alignSelf: "flex-end",
  },
});
