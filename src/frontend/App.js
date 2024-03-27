import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OfferScreen from "../frontend/screens/OfferScreen";
import RequestScreen from "../frontend/screens/RequestScreen";
import AccountScreen from "../frontend/screens/AccountScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';

/* 
Gray : #cbcbcb
Light blue : #00b8de
Dark blue : #0c2340
Green : #99cc33
*/
const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
        name = "Offers" 
        component={OfferScreen}
        options = {{
            title : "Offres",
            headerStyle : {
              backgroundColor : "#0c2340"
            },
            headerTitleStyle : {
              fontWeight : "bold",
              color : "#fff"
            },
            tabBarActiveBackgroundColor : "#1d3451",
            tabBarActiveTintColor : "#fff",
            tabBarInactiveBackgroundColor : "#0c2340",
            tabBarInactiveTintColor : "#fff"
        }}
        />
        <Tab.Screen 
            name = "Requests" 
            component={RequestScreen}
            options = {{
            title : "Requêtes",
            headerStyle : {
              backgroundColor : "#0c2340"
            },
            headerTitleStyle : {
              fontWeight : "bold",
              color : "#fff"
            },
            tabBarActiveBackgroundColor : "#1d3451",
            tabBarActiveTintColor : "#fff",
            tabBarInactiveBackgroundColor : "#0c2340",
            tabBarInactiveTintColor : "#fff",
          }}  
        />
        <Tab.Screen 
          name = "Account" 
          component={AccountScreen}
          options = {{
          title : "Compte",
          headerStyle : {
          backgroundColor : "#0c2340"
          },
          headerTitleStyle : {
            fontWeight : "bold",
            color : "#fff"
          },
          tabBarActiveBackgroundColor : "#1d3451",
          tabBarActiveTintColor : "#fff",
          tabBarInactiveBackgroundColor : "#0c2340",
          tabBarInactiveTintColor : "#fff",
          }}  
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


