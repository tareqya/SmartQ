import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ProfileIcon from "../../assets/icons/profile.svg";
import HomeIcon from "../../assets/icons/home.svg";
import QueueIcon from "../../assets/icons/queue.svg";

const LogoutIcon = ({ color = "black", size = 25 }) => (
  <MaterialIcons name="logout" color={color} size={size} />
);

const PersonIcon = ({ color = "black", size = 25 }) => (
  <MaterialIcons name="person" color={color} size={size} />
);

export default {
  PersonIcon,
  LogoutIcon,
  ProfileIcon,
  HomeIcon,
  QueueIcon,
};
