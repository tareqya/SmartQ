import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS, STYLES } from "../../assets/styles";

const Card = ({ imgUrl, title, subTitle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={imgUrl} resizeMode="stretch" style={styles.image} />
      </View>

      <View style={styles.titleWrapper}>
        <Text style={[FONTS.h2, styles.title]}>{title}</Text>
        <Text style={[FONTS.body2, styles.subTitle]}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    ...STYLES.shadow,
  },
  imageWrapper: {
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  titleWrapper: {
    marginHorizontal: 5,
  },
  image: {
    width: 50,
    height: 50,
  },
  title: {
    color: COLORS.darkBlue,
    textAlign: "right",
  },
  subTitle: {
    color: COLORS.lightGray,
    textAlign: "right",
  },
});
