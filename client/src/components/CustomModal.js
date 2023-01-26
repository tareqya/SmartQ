import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { COLORS, Icons, SIZES } from "../../assets/styles";

const ANIMATION_FADE = "fade";
const ANIMATION_SLIDE = "slide";

const CustomModal = ({
  children,
  visible,
  onDissmis,
  animationType = ANIMATION_SLIDE,
}) => {
  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={visible}
      onRequestClose={onDissmis}
    >
      <View style={styles.centeredView}>
        <Pressable style={styles.background} onPress={onDissmis} />
        {children}
      </View>
    </Modal>
  );
};

export { CustomModal, ANIMATION_FADE, ANIMATION_SLIDE };

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    height: SIZES.height,
    width: SIZES.width,
    backgroundColor: "black",
    opacity: 0.5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },

  btnClose: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
