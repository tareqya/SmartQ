import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { COLORS, FONTS } from "../../assets/styles";

const EditText = ({
  value,
  onChange,
  style,
  label = "",
  icon = null,
  secure = false,
  placeholder = "",
  numbers = false,
  onPress = {},
}) => {
  return (
    <TextInput
      label={label}
      onChangeText={onChange}
      value={value}
      style={[FONTS.body1, style]}
      secureTextEntry={secure}
      autoCapitalize="none"
      autoCorrect={false}
      placeholder={placeholder}
      mode="outlined"
      right={icon && <TextInput.Icon icon={icon} onPress={onPress} />}
      keyboardType={numbers ? "phone-pad" : "default"}
      selectionColor={COLORS.text}
      activeOutlineColor={COLORS.primary}
    />
  );
};

const styles = StyleSheet.create({
  label: {},
});
export default EditText;
