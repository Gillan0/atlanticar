import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OfferScreen from "../screens/OfferScreen.js"
import CreateAnnouncementScreen from "../screens/CreateAnnouncementScreen.js"
import RequestScreen from '../screens/RequestScreen.js';

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
            }
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
            }
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