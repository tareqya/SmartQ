import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, ProfileScreen, AppointmentScreen } from "../screens/Home";

import { COLORS, Icons } from "../../assets/styles";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel: "",
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.darkGray,
        tabBarStyle: {
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          height: 80,
        },
      }}
      initialRouteName="HomeScreen"
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={() => {
          return {
            tabBarIcon: ({ color, size, focused }) => (
              <View style={styles.iconWrapper}>
                <Icons.HomeIcon fill={color} />
                <Text
                  style={[
                    styles.iconLabel,
                    { color: focused ? COLORS.primary : COLORS.darkGray },
                  ]}
                >
                  ראשי
                </Text>
              </View>
            ),
          };
        }}
      />
      <Tab.Screen
        name="AppointmentScreen"
        component={AppointmentScreen}
        options={() => {
          return {
            tabBarIcon: ({ color, size, focused }) => (
              <View style={styles.iconWrapper}>
                <Icons.QueueIcon fill={color} />
                <Text
                  style={[
                    styles.iconLabel,
                    { color: focused ? COLORS.primary : COLORS.darkGray },
                  ]}
                >
                  התורים שלי
                </Text>
              </View>
            ),
          };
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={() => {
          return {
            tabBarIcon: ({ color, size, focused }) => (
              <View style={styles.iconWrapper}>
                <Icons.ProfileIcon fill={color} />
                <Text
                  style={[
                    styles.iconLabel,
                    { color: focused ? COLORS.primary : COLORS.darkGray },
                  ]}
                >
                  המשתמש
                </Text>
              </View>
            ),
          };
        }}
      />
    </Tab.Navigator>
  );
};

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="BottomTabNavigation"
    >
      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
      />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  iconLabel: {
    fontSize: 14,
    marginTop: 2,
  },
});
export default HomeNavigation;
