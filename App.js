import React from "react";
import MainScreen from "./src/screens/MainScreen";
import GalleryScreen from "./src/screens/GalleryScreen";
import MarsRobot from "./src/screens/MarsRobot";
import DayImage from "./src/screens/DayImage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SearchInLibrary from "./src/screens/SearchInLibrary";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main Screen">
        <Stack.Screen 
          name="Main screen" 
          component={MainScreen} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Mars rover" 
          component={MarsRobot} 
          options={{
            headerTintColor: '#FFFFFF',
            headerStyle: {
              backgroundColor: '#333',
            },
          }}
          />
        <Stack.Screen 
          name="Day image" 
          component={DayImage} 
          options={{
            headerTintColor: '#FFFFFF',
            headerStyle: {
              backgroundColor: '#333',
            },
          }}
          />
        <Stack.Screen 
          name="Results" 
          component={GalleryScreen} 
          options={{
            headerTintColor: '#FFFFFF',
            headerStyle: {
              backgroundColor: '#333',
            },
          }}
          />
        <Stack.Screen 
          name="Search in library" 
          component={SearchInLibrary} 
          options={{
            headerTintColor: '#FFFFFF',
            headerStyle: {
              backgroundColor: '#333',
            },
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


