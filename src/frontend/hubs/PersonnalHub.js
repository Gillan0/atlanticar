import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from "../screens/AccountScreen.js";
import ApplicationScreen from "../screens/ApplicationScreen.js";
import AnnouncementScreen from '../screens/AnnouncementScreen.js';

/* 
Gray : #cbcbcb
Light blue : #00b8de
Dark blue : #0c2340
Green : #99cc33
*/
const Stack = createNativeStackNavigator()

export default function PersonnalHub({route}) {
  return (
      <Stack.Navigator>
        <Stack.Screen 
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
            }
        }}
        />
        <Stack.Screen 
            name = "AnnouncementsOffers" 
            component={AnnouncementScreen}
            initialParams={{...route.params, type : "offer"}}
            options = {{
            title : "Annonces créées",
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
        <Stack.Screen 
            name = "AnnouncementsRequests" 
            component={AnnouncementScreen}
            initialParams={{...route.params, type : "request"}}
            options = {{
            title : "Requêtes créées",
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
        <Stack.Screen 
          name = "ApplicationsOffers" 
          component={ApplicationScreen}
          initialParams={{...route.params, type : "offer"}}
          options = {{
          title : "Candidatures - Offres",
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
        <Stack.Screen 
          name = "ApplicationsRequests" 
          component={ApplicationScreen}
          initialParams={{...route.params, type : "request"}}
          options = {{
          title : "Candidatures - Requêtes",
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
};