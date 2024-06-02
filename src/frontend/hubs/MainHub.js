import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import AnnouncementHub from "./AnnouncementHub";
import PersonnalHub from "./PersonnalHub";
import AnnouncementScreen from '../screens/AnnouncementScreen';

// Navigation Type : Bottom Tab Navigator
const Tab = createBottomTabNavigator();

/**
 * Allows navigation to the following hubs : 
 *    -  OfferHub (instance of AnnouncementHub for Offers)
 *    -  RequestHub (instance of AnnouncementHub for Requests)
 *    -  PersonalHub
 * 
 * @param {Route<string>} route - Navigation route  
 * @returns {React.ReactElement}
 */
export default function MainHub({route}) {
  return (
    <>
      {/* Tab navigation type */}
      <Tab.Navigator>

        {/* Adds option to go to the OfferHub*/}
        <Tab.Screen 
        name = "Offers" 
        component={AnnouncementHub}
        initialParams={{...route.params, type : "offer"}}
        options = {{
            headerShown: false, 
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

        {/* Adds option to go to the ReequestHub*/}
        <Tab.Screen 
            name = "Requests" 
            component={AnnouncementHub}
            initialParams={{...route.params, type : "request"}}
            options = {{
            headerShown: false, 
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

        {/* Adds option to go to the PersonalHub*/}
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
    </>
  )
};