import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { SIZES } from "../../assets/styles";

const Container = ({ children, header = null }) => {
  const { colors } = useTheme();
  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <SafeAreaView />
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
