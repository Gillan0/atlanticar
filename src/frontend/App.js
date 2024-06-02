import * as React from 'react';
import LoginScreen from './screens/LoginScreen.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MainHub from './hubs/MainHub.js';
import SignUpScreen from './screens/SignUpScreen.js';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen.js';

// Allows for screen navigation
const Stack = createNativeStackNavigator();


/**
 * Allows navigation between Login, SignUp and ForgottenPassword screens
 * @returns {React.ReactElement}
 */
export default function App() {
  return (
    <>
      {/* Main navigation container */}
      <NavigationContainer>

        {/* Stack navigation type with default screen as the Login Screen */}
        <Stack.Navigator initialRouteName="Login"> 

          {/* Adds option to go to the Login Screen */}
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

          {/* Adds option to go to the SignUp Screen */}
          <Stack.Screen name = "SignUp"
                        component={SignUpScreen}
                        options = {{
                        title : "Créer mon compte",
                        headerTintColor: "#fff",
                        headerStyle : {
                          backgroundColor : "#0c2340"
                        },
                        headerTitleStyle : {
                          fontWeight : "bold",
                          color : "#fff"
                        }}}/>

          {/* Adds option to go to the ForgottenPassword Screen */}
          <Stack.Screen name = "ForgotPassword"
                        component={ForgotPasswordScreen}
                        options = {{
                        title : "Réinitialisation du mot de passe",
                        headerTintColor: "#fff",
                        headerStyle : {
                          backgroundColor : "#0c2340"
                        },
                        headerTitleStyle : {
                          fontWeight : "bold",
                          color : "#fff"
                        }}}/>

          {/* Allows navigation to all screens which are linked to MainHub*/}
          <Stack.Screen name = "Main" 
                        component={MainHub}
                        options={{ headerShown: false }}/>

        </Stack.Navigator>
        
      </NavigationContainer>
    </>
  )
};