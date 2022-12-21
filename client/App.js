import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "./src/store";
import MainNavigation from "./src/navigation/MainNavigation";

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <MainNavigation />
    </Provider>
  );
};

export default App;
