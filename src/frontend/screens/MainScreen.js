import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OfferScreen from "./OfferScreen";
import RequestScreen from "./RequestScreen";
import AccountScreen from "./AccountScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';

/* 
Gray : #cbcbcb
Light blue : #00b8de
Dark blue : #0c2340
Green : #99cc33
*/
const Tab = createBottomTabNavigator()

export default function MainScreen({route}) {
  return (
      <Tab.Navigator>
        <Tab.Screen 
        name = "Offers" 
        component={OfferScreen}
        initialParams={route.params}
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
            initialParams={route.params}
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
          initialParams={route.params}
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
  )
};