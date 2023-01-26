import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

import ProfileIcon from "../../assets/icons/profile.svg";
import HomeIcon from "../../assets/icons/home.svg";
import QueueIcon from "../../assets/icons/queue.svg";

const LogoutIcon = ({ color = "black", size = 25 }) => (
  <MaterialIcons name="logout" color={color} size={size} />
);

const PersonIcon = ({ color = "black", size = 25 }) => (
  <MaterialIcons name="person" color={color} size={size} />
);

const CloseIcon = ({ color = "black", size = 25 }) => (
  <AntDesign name="close" color={color} size={size} />
);

const CalendarIcon = ({ color = "black", size = 25 }) => (
  <AntDesign name="calendar" size={size} color={color} />
);

const TimeIcon = ({ color = "black", size = 25 }) => (
  <Ionicons name="time-outline" size={size} color={color} />
);

export default {
  PersonIcon,
  LogoutIcon,
  ProfileIcon,
  HomeIcon,
  QueueIcon,
  CloseIcon,
  CalendarIcon,
  TimeIcon,
};
