import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import AuthNavigation from "./AuthNavigation";
import HomeNavigation from "./HomeNavigation";
import { fetch_current_user } from "../actions";

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const MainNavigation = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const AuthState = useSelector((state) => state.AuthReducer);
  const { user } = AuthState;

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      const action = await fetch_current_user();
      dispatch(action);
      setLoading(false);
    };

    fetchCurrentUser();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user == null ? (
          <Stack.Screen component={AuthNavigation} name="AuthNavigation" />
        ) : (
          <Stack.Screen component={HomeNavigation} name="HomeNavigation" />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
