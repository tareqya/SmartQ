import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, CustomButton, EditText } from "../../components";
import { Icons, Images, SIZES } from "../../../assets/styles";
import { login } from "../../actions/AuthActions";
import { cleanMsg, setLoading } from "../../actions/CommonActions";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [uid, setUid] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [secure, setSecure] = React.useState(true);
  const CommonReducer = useSelector((state) => state.CommonReducer);

  const { loading } = CommonReducer;

  const hanldeLoginPress = async () => {
    if (loading) return;
    dispatch(cleanMsg());
    dispatch(setLoading(true));
    const action = await login(dispatch, uid, password);
    dispatch(action);
    dispatch(setLoading(false));
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
        {/* password input */}
        <EditText
          value={password}
          onChange={(txt) => setPassword(txt)}
          label="סיסמה"
          placeholder={"הזן את הסיסמה שלך"}
          icon={secure ? "eye" : "eye-off"}
          style={{ ...styles.uidInput, marginTop: 10 }}
          onPress={() => setSecure((prev) => !prev)}
          secure={secure}
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
