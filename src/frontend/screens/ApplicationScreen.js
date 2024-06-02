import {View, ScrollView, StatusBar} from "react-native";
import React, {useState} from 'react';
import ApplicationItem from "../components/ApplicationItem";
import { useFocusEffect } from '@react-navigation/native';
import url from "../misc/url";


/**
 * Displays the user's applications (offer or request)
 * 
 * @param {Route<string>} route -  Navigation route
 * @returns 
 */
export default function ApplicationScreen({route}) {

  // Initializing variables to chosse which applications to render
  const [shownApplications,setShownApplications] = useState([]);

  /**
   * Sends a HTTP request to the server and changes rendered 
   * announcements based on answer
   * 
   * @param {String} command - command interpreted by server
   * @param {Array<*>} parameters - parameters for the sql script 
   */
  function request(command,parameters=[]) {

    // Data to send to server
    const dataToSend = {
      id: route.params.id,
      password: route.params.password,
      command : command,
      parameters : parameters
    };
  
    // HTTP request options
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend) // Data converted to JSON format
    };
  
    // Sends HTTP request
    fetch(url, requestOptions)

      // Checks if answer exploitable
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la requête.');
        }
        return response.json(); // Renvoie les données JSON de la réponse
      })

      // Changes rendered applications
      .then(data => {
        console.log(data);
        setShownApplications(data[0]);
      })

      // Error failsafe
      .catch(error => {
        console.error('Erreur :', error);
      });  
    }

  // Once Screen focused on
  useFocusEffect(
    React.useCallback(() => {
      console.log('Applicationscreen');
      try {

        // Request command changes based on type of screen (offer / request)
        if (route.params.type == "offer") {
          request("get_applications_offers")
        } else if (route.params.type == "request") {
          request("get_applications_requests")
        }
      } catch (error) {
        console.error(error)
      }

      return () => {
        // Optional : if you quit screen
      };
    }, [])
  );

  return (
      <View style = {{flex : 1, backgroundColor : "white"}}>
        
        <StatusBar backgroundColor="#99cc33"/>
        
        <ScrollView>

          {/* Rendered applications */}
          {shownApplications.length > 0 ? 
            shownApplications.map( (value, index) => (
                <ApplicationItem key = {index} content = {{...value, type : route.params.type}} account = {route.params}/>
              ))
            :(
              /* Message when no application was created */ 
              route.params.type == "offer" ? 
                <Text style = {{alignSelf:"center", padding : 20, fontSize : 16}}> Vous n'avez candidaté à aucune Offre </Text>
                : 
                <Text style = {{alignSelf:"center", padding : 20, fontSize : 16}}> Vous n'avez candidaté à aucune Requête </Text>
              )
          }

        </ScrollView>
      
      </View>
    )
}