import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { FONTS } from "../../assets/styles";

const CircleView = ({ title, imageUrl, color }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.circleOut, { borderColor: color }]}>
        <View style={[styles.circleIn, { backgroundColor: color }]}>
          <Image source={imageUrl} style={styles.image} resizeMode="stretch" />
        </View>
      </View>
      <Text style={[FONTS.h2, { color: color }]}>{title}</Text>
    </View>
  );
};

export default CircleView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  circleOut: {
    height: 130,
    width: 130,
    borderRadius: 80,
    borderWidth: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  circleIn: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  image: {
    width: 50,
    height: 50,
  },
});
