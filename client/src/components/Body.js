import { Platform, StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { SIZES, Icons, COLORS } from "../../assets/styles";

const Body = ({ children, navigation = null }) => {
  const Header = () => {
    return (
      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity
          style={styles.backButtonWrapper}
          activeOpacity={0.7}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icons.RightArrowIcon color={COLORS.black} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {navigation != null && Header()}
      {children}
    </View>
  );
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
  backButtonWrapper: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.darkGray,
    marginHorizontal: 10,
    alignSelf: "flex-end",
  },
});
