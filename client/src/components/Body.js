import { Platform, StyleSheet, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../assets/styles";

const Body = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default Body;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    marginTop: Platform.OS == "ios" ? 30 : 40,
    minHeight: SIZES.height,
    padding: 20,
  },
});
