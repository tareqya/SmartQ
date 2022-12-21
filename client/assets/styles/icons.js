import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const LogoutIcon = ({ color = "black", size = 25 }) => (
  <MaterialIcons name="logout" color={color} size={size} />
);

const PersonIcon = ({ color = "black", size = 25 }) => (
  <MaterialIcons name="person" color={color} size={size} />
);

export default {
  PersonIcon,
  LogoutIcon,
};
