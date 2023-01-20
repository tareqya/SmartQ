import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import { I18nManager } from "react-native";
import store from "./src/store";
import MainNavigation from "./src/navigation/MainNavigation";

try {
  I18nManager.allowRTL(false);
} catch (e) {
  console.log(e);
}

const App = () => {
  const [loaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <MainNavigation />
    </Provider>
  );
};

export default App;
