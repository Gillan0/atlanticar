import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import OfferScreen from "../screens/OfferScreen";
import RequestScreen from "../screens/RequestScreen";
import PersonnalHub from "./PersonnalHub";

/* 
Gray : #cbcbcb
Light blue : #00b8de
Dark blue : #0c2340
Green : #99cc33
*/
const Tab = createBottomTabNavigator()

export default function MainHub({route}) {
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
            tabBarInactiveTintColor : "#fff",
            tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../assets/offer.png')}
              style={{ width: size, height: size }}
              resizeMode="contain"
              />
            )
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
            tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../assets/request.png')}
              style={{ width: size, height: size }}
              resizeMode="contain"
              />
            )
          }}  
        />
        <Tab.Screen 
          name = "PersonnalHub" 
          component={PersonnalHub}
          initialParams={route.params}
          options = {{ headerShown: false, 
          title : "Compte",
          tabBarActiveBackgroundColor : "#1d3451",
          tabBarActiveTintColor : "#fff",
          tabBarInactiveBackgroundColor : "#0c2340",
          tabBarInactiveTintColor : "#fff",
            tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../assets/account.png')}
              style={{ width: size, height: size }}
              resizeMode="contain"
              />
            )
          }}  
        />
      </Tab.Navigator>
  )
};