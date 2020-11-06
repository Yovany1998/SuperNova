import React from "react";
import MainScreen from "./src/screens/MainScreen";
import GalleryScreen from "./src/screens/GalleryScreen";
import MarsRobot from "./src/screens/MarsRobot";
import DayImage from "./src/screens/DayImage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="MarsRobot" component={MarsRobot} />
        <Stack.Screen name="DayImage" component={DayImage} />
        <Stack.Screen name="GalleryScreen" component={GalleryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
