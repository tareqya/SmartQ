import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { Animated, Easing } from "react-native";

const LoadingBar = () => {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    Animated.loop(animation).start();
  }, []);
  return (
    <LottieView
      style={{
        width: "100%",
      }}
      source={require("../../assets/json/loading.json")}
      progress={progress}
    />
  );
};

export default LoadingBar;
