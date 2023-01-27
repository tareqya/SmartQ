import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  ProfileScreen,
  AppointmentMenuScreen,
  SearchCloserAppointmentScreen,
  CancelAppointmentScreen,
  ResheduleAppointmentScreen,
} from "../screens/Home";

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
          position: "absolute",
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
                  פרופיל
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
      <Stack.Screen
        name="AppointmentMenuScreen"
        component={AppointmentMenuScreen}
      />
      <Stack.Screen
        name="CancelAppointmentScreen"
        component={CancelAppointmentScreen}
      />
      <Stack.Screen
        name="ResheduleAppointmentScreen"
        component={ResheduleAppointmentScreen}
      />
      <Stack.Screen
        name="SearchCloserAppointmentScreen"
        component={SearchCloserAppointmentScreen}
      />
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
    fontSize: 16,
    marginTop: 2,
  },
});
export default HomeNavigation;
