import React from "react";
import { TextInput } from "react-native-paper";
import { COLORS } from "../../assets/styles";

const EditText = ({
  value,
  onChange,
  style,
  label = "",
  icon = null,
  secure = false,
  placeholder = "",
  numbers = false,
}) => {
  return (
    <TextInput
      label={label}
      onChangeText={onChange}
      value={value}
      style={style}
      secureTextEntry={secure}
      autoCapitalize="none"
      autoCorrect={false}
      placeholder={placeholder}
      mode="outlined"
      right={icon && <TextInput.Icon icon={icon} />}
      keyboardType={numbers ? "phone-pad" : "default"}
      selectionColor={COLORS.text}
      activeOutlineColor={COLORS.primary}
    />
  );
};

export default EditText;
