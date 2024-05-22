import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OfferScreen from "../screens/OfferScreen.js"
import CreateAnnouncementScreen from "../screens/CreateAnnouncementScreen.js"
import RequestScreen from '../screens/RequestScreen.js';
import {View, StyleSheet, Text, Pressable, StatusBar, Alert, TextInput, Image, ScrollView} from "react-native";

/* 
Gray : #cbcbcb
Light blue : #00b8de
Dark blue : #0c2340
Green : #99cc33
*/
const Stack = createNativeStackNavigator()

export default function AnnouncementHub({route}) {

  if (route.params.type == "offer") {
    return (
      <Stack.Navigator>
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
            headerRight: () => (
             <Pressable onPress={() => Alert.alert('Principe des offres', '• Si vous possédez une voiture, vous pouvez créer une offre. \n • Si vous cherchez un conducteur pour votre destination, vous pouvez candidater !')}>
              <Image
                source={require('../assets/blue_info.png')}
                style={{ width: 75, height: 35, marginRight: 45 }}
                resizeMode="contain"
              />
            </Pressable>
            )
        }}
        />
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
  )
  }
  else if (route.params.type == "request") {
    return (
      <Stack.Navigator>
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
            headerRight: () => (
              <Pressable onPress={() => Alert.alert('Principe des reqêtes', '• Si vous chercher un voiture pour votre trajet, vous pouvez créer une requête. \n • Si vous cherchez des passagers pour votre destination, vous pouvez candidater !')}>
               <Image
                 source={require('../assets/blue_info.png')}
                 style={{ width: 75, height: 35, marginRight: 45 }}
                 resizeMode="contain"
               />
             </Pressable>
             )
        }}
        />
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
  )
  }
};