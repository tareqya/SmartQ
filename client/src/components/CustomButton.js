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
      style={[
        {
          backgroundColor: COLORS.primary,
          marginHorizontal: 20,
          borderRadius: 5,
        },
        style,
      ]}
    >
      <Text style={FONTS.h2}>{label}</Text>
    </Button>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
