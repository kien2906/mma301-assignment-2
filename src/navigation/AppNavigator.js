import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from './BottomTabNavigator';
import HomeStack from './BottomTabNavigator';


const AppNavigator = () => {
  return (
   <NavigationContainer>
    <HomeStack/>
   </NavigationContainer>
  )
}

export default AppNavigator