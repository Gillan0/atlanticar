import * as React from 'react';
import LoginScreen from './screens/LoginScreen.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MainHub from './hubs/MainHub.js';
/* 
Gray : #cbcbcb
Light blue : #00b8de
Dark blue : #0c2340
Green : #99cc33
*/

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Login" 
                      component={LoginScreen} 
                      options ={{
                      title : "Se connecter",
                      headerStyle : {
                        backgroundColor : "#0c2340"
                      },
                      headerTitleStyle : {
                        fontWeight : "bold",
                        color : "#fff"
                      }}}/>
        <Stack.Screen name = "Main" 
                      component={MainHub}
                      options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};