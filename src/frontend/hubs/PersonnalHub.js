import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from "../screens/AccountScreen.js";
import ApplicationScreen from "../screens/ApplicationScreen.js";
import AnnouncementScreen from '../screens/AnnouncementScreen.js';
import NotificationScreen from '../screens/NotificationScreen.js';
import ModificationPasswordScreen from '../screens/ModificationPasswordScreen.js';
import ModificationPhoneNumberScreen from '../screens/ModificationPhoneNumberScreen.js';
import ModifyAnnouncementScreen from '../screens/ModifyAnnouncementScreen.js';
import ModificationEmailScreen from '../screens/ModificationEmailScreen.js';

// Navigation Type : Stack
const Stack = createNativeStackNavigator()

/**
 * Allows navigation to the screens : 
 *    -  Main Account Screen
 *    -  User's created offer screen
 *    -  User's created request screen
 *    -  User's applications to offers screen
 *    -  User's applications to requests screen
 *    -  Modifying password screen
 *    -  Modifying email screen
 *    -  Modifying phone number screen
 *    -  Modifying a user's created announcement
 *    -  Notification screen
 * 
 * @param {Route<string>} route - Navigation route  
 * @returns {React.ReactElement}
 */
export default function PersonnalHub({route}) {
  return (
    <>
      {/* Stack navigation type */}
      <Stack.Navigator>

        {/* Adds option to go to the main Account Screen */}
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

        {/* Adds option to go to the user's created offers screen */}
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

        {/* Adds option to go to the user's created requests screen */}
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

        {/* Adds option to go to the user's applications to offers screen */}
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

        {/* Adds option to go to the user's applications to requests screen */}
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

        {/* Adds option to go to the screen where the user can modify an announcement */}
        <Stack.Screen 
          name = "ModifyAnnouncement" 
          component={ModifyAnnouncementScreen}
          initialParams={route.params}
          options = {{
          title : "",
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

        {/* Adds option to go to Notification Screen*/}
        <Stack.Screen 
          name = "Notifications" 
          component={NotificationScreen}
          initialParams={route.params}
          options = {{
          title : "Notifications",
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
        
        {/* Adds option to go to modifying password screen*/}
        <Stack.Screen 
          name = "ModificationPassword" 
          component={ModificationPasswordScreen}
          initialParams={route.params}
          options = {{
          title : "",
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

        {/* Adds option to go to modifying phone number screen*/}
        <Stack.Screen 
          name = "ModificationPhoneNumber" 
          component={ModificationPhoneNumberScreen}
          initialParams={route.params}
          options = {{
          title : "",
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

        {/* Adds option to go to modifying email screen*/}
        <Stack.Screen 
          name = "ModificationEmail" 
          component={ModificationEmailScreen}
          initialParams={route.params}
          options = {{
          title : "",
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
};