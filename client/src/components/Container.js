import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Platform,
} from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { SIZES } from "../../assets/styles";
import MsgDialog from "./MsgDialog";
import { useSelector } from "react-redux";

const Container = ({ children, header = null }) => {
  const { colors } = useTheme();
  const CommonState = useSelector((state) => state.CommonReducer);
  const { msg, msgType } = CommonState;
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (msg != "") setVisible(true);
  }, [msg]);

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <SafeAreaView style={{ marginTop: Platform.OS == "ios" ? 0 : 20 }} />

      <MsgDialog
        visible={visible}
        onDissmis={() => setVisible(false)}
        msg={msg}
        msgType={msgType}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={[children]}
        ListHeaderComponent={header}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => item}
        ListFooterComponent={<View style={styles.footer} />}
      />
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    height: SIZES.padding * 2,
  },
});
