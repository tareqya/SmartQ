import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import AuthNavigation from "./AuthNavigation";
import HomeNavigation from "./HomeNavigation";

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const MainNavigation = () => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen component={AuthNavigation} name="AuthNavigation" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
