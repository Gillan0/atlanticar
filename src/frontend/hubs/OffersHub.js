import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OfferScreen from "../screens/OfferScreen.js"
import CreateOfferScreen from "../screens/CreateOfferScreen.js"

/* 
Gray : #cbcbcb
Light blue : #00b8de
Dark blue : #0c2340
Green : #99cc33
*/
const Stack = createNativeStackNavigator()

export default function OffersHub({route}) {
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
            component={CreateOfferScreen}
            initialParams={{...route.params, type : "offer"}}
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
};