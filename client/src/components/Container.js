import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Platform,
} from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import MsgDialog from "./MsgDialog";
import { cleanMsg } from "../actions";

const Container = ({ children }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const CommonState = useSelector((state) => state.CommonReducer);
  const { msg, msgType, showMsg } = CommonState;

  const handleDissmis = () => {
    dispatch(cleanMsg());
  };

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <SafeAreaView style={{ marginTop: Platform.OS == "ios" ? 0 : 20 }} />

      <MsgDialog
        visible={showMsg}
        onDissmis={handleDissmis}
        msg={msg}
        msgType={msgType}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={[children]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => item}
      />
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
