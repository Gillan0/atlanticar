import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from "./AccountScreen.js";
import ApplicationScreen from "./ApplicationScreen.js";
import AnnouncementScreen from "./AnnouncementScreen.js";

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
            name = "Announcements" 
            component={AnnouncementScreen}
            initialParams={route.params}
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
          name = "Applications" 
          component={ApplicationScreen}
          initialParams={route.params}
          options = {{
          title : "Vos candidatures",
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