import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import * as Modal from "./CustomModal";
import {
  ERROR_IMAGE,
  SUCCESS_IMAGE,
  INFO_IMAGE,
} from "../../assets/styles/images";
import Icons from "../../assets/styles/icons";
import { COLORS, FONTS, SIZES } from "../../assets/styles";
import { ERROR, SUCCESS, INFO } from "../utils/constans";
import { Button } from "react-native-paper";

const MsgDialog = ({ msg, msgType, visible, onDissmis }) => {
  const getDialogImage = () => {
    if (msgType == ERROR) return ERROR_IMAGE;
    if (msgType == SUCCESS) return SUCCESS_IMAGE;
    else return INFO_IMAGE;
  };

  const getButtonBackground = () => {
    if (msgType == ERROR) return COLORS.tomato;
    if (msgType == SUCCESS) return COLORS.green;
    else return COLORS.blue;
  };
  const handlePress = () => {
    onDissmis();
  };

  return (
    <Modal.CustomModal visible={visible} onDissmis={onDissmis}>
      <View style={styles.modalView}>
        <View style={styles.iconWrapper}>
          <Image
            source={getDialogImage()}
            style={styles.icon}
            resizeMode="stretch"
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnClose}
          onPress={onDissmis}
        >
          <Icons.CloseIcon color={COLORS.darkGray} />
        </TouchableOpacity>

        <Text style={[FONTS.body1, { textAlign: "right" }]}>{msg}</Text>

        <Button
          onPress={handlePress}
          style={[styles.btn, { backgroundColor: getButtonBackground() }]}
        >
          <Text style={[FONTS.h2, { color: COLORS.white }]}>{"סגור"}</Text>
        </Button>
      </View>
    </Modal.CustomModal>
  );
};

export default MsgDialog;

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: SIZES.height / 1.5,
    zIndex: 99,
  },
  iconWrapper: {
    backgroundColor: COLORS.white,
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -20,
    borderRadius: 30,
    alignSelf: "center",
  },
  btn: {
    marginTop: 30,
  },
});
