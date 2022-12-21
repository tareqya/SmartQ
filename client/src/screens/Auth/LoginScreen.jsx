import { Image, StyleSheet, View } from "react-native";
import React from "react";

import { Container, EditText } from "../../components";
import { Icons, Images, SIZES } from "../../../assets/styles";

const LoginScreen = () => {
  const [uid, setUid] = React.useState("");

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

        {/* erorr msg  */}
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
    marginTop: SIZES.padding * 5,
  },
});
