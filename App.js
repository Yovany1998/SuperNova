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
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen 
          name="Main Screen" 
          component={MainScreen} 
          options={{
            headerTintColor: '#FFFFFF',
            headerStyle: {
              backgroundColor: '#333',
            },
          }} />
        <Stack.Screen 
          name="Mars Rover" 
          component={MarsRobot} 
          options={{
            headerTintColor: '#FFFFFF',
            headerStyle: {
              backgroundColor: '#333',
            },
          }}
          />
        <Stack.Screen 
          name="Day Image" 
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
          name="Search In Library" 
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


