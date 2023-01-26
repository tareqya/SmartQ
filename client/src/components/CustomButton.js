import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

import React from "react";
import { COLORS, FONTS } from "../../assets/styles";

const CustomButton = ({ label, onPress, style = {}, loading = false }) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      loading={loading}
      style={[styles.btn, style]}
    >
      <Text style={FONTS.h1}>{label}</Text>
    </Button>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 5,
  },
});
