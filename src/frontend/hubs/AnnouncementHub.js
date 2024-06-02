import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OfferScreen from "../screens/OfferScreen.js"
import CreateAnnouncementScreen from "../screens/CreateAnnouncementScreen.js"
import RequestScreen from '../screens/RequestScreen.js';
import {View, StyleSheet, Text, Pressable, StatusBar, Alert, TextInput, Image, ScrollView} from "react-native";

// Navigation Type : Stack
const Stack = createNativeStackNavigator()

/**
 * Allows navigation to the screens : 
 *    -  listing all announcements not created / applied to by the user.
 *    -  creating an annoucement
 * 
 * @param {Route<string>} route - Navigation route  
 * @returns {React.ReactElement}
 */
export default function AnnouncementHub({route}) {

  // Check announcement type (Offer / Request)
  if (route.params.type == "offer") {
    return (
      <>
        {/* Stack navigation type */}
        <Stack.Navigator>

          {/* Adds option to go to the main Offers Screen*/}
          <Stack.Screen 
            name = "OffersList" 
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
                // Help popup
                headerRight: () => (
                <Pressable onPress={() => Alert.alert('Principe des offres', '• Si vous possédez une voiture, vous pouvez créer une offre. \n • Si vous cherchez un conducteur pour votre destination, vous pouvez candidater !')}>
                  <Image
                    source={require('../assets/white_info.png')}
                    style={{ width: 35, height: 35, marginRight: 5 }}
                    resizeMode="contain"
                  />
                </Pressable>
                )
            }}
          />

          {/* Adds option to go to the CreateOffer Screen */}
          <Stack.Screen 
            name = "CreateOffer" 
            component={CreateAnnouncementScreen}
            initialParams={route.params}
            options = {{
              title : "Créer une Offre",
              headerStyle : {
                backgroundColor : "#0c2340"
              },
              headerTintColor: "#fff",
              headerTitleStyle : {
                fontWeight : "bold",
                color : "#fff"
              }
            }}  
          />
        
        </Stack.Navigator>
      </>
    )
  }
  else if (route.params.type == "request") {
    return (
      <>
        {/* Stack navigation type */}
        <Stack.Navigator>

          {/* Adds option to go to the main Requests Screen */}
          <Stack.Screen 
          name = "RequestsList" 
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
              // Help popup
              headerRight: () => (
                <Pressable onPress={() => Alert.alert('Principe des reqêtes', '• Si vous chercher un voiture pour votre trajet, vous pouvez créer une requête. \n • Si vous cherchez des passagers pour votre destination, vous pouvez candidater !')}>
                <Image
                  source={require('../assets/white_info.png')}
                  style={{ width: 40, height: 40, marginRight: 5 }}
                  resizeMode="contain"
                />
              </Pressable>
              )
          }}
          />

          {/* Adds option to go to the CreateRequest Screen */}
          <Stack.Screen 
              name = "CreateRequest" 
              component={CreateAnnouncementScreen}
              initialParams={route.params}
              options = {{
              title : "Créer une Requête",
              headerStyle : {
                backgroundColor : "#0c2340"
              },
              headerTintColor: "#fff",
              headerTitleStyle : {
                fontWeight : "bold",
                color : "#fff"
              }
            }}  
          />
        </Stack.Navigator>
      </>
    )
  }
};