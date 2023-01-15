import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, CustomButton, EditText } from "../../components";
import { Icons, Images, SIZES } from "../../../assets/styles";
import { login } from "../../actions/AuthActions";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const AuthState = useSelector((state) => state.AuthReducer);
  const [uid, setUid] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const hanldeLoginPress = async () => {
    if (loading) return;
    setLoading(true);
    const action = await login(uid);
    dispatch(action);
    setLoading(false);
  };

  return (
    <Container>
      <View>
        {/* image header  */}
        <Image source={Images.LOGO} style={styles.logo} resizeMode="stretch" />

        {/* uid input */}
        <EditText
          value={uid}
          onChange={(txt) => setUid(txt)}
          label="ת״ז"
          placeholder={"הזן את ת״ז שלך"}
          icon={Icons.PersonIcon}
          style={styles.uidInput}
          numbers
        />

        {/* login button */}
        <CustomButton
          loading={loading}
          label={"התחבר"}
          onPress={hanldeLoginPress}
          style={styles.btnLogin}
        />
      </View>
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",
    marginTop: SIZES.base,
    width: SIZES.width * 0.9,
  },
  uidInput: {
    marginHorizontal: 10,
    marginTop: SIZES.padding * 6,
  },
  btnLogin: {
    marginTop: 100,
  },
});
