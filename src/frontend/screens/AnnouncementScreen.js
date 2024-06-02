import {View, Text, ScrollView, StatusBar} from "react-native";
import React, {useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import CreatedItem from "../components/CreatedItem.js";
import url from "../misc/url.js";


/**
 * Displays the user's created announcements (offer or request)
 * 
 * @param {Route<string>} route -  Navigation route
 * @returns 
 */
export default function AnnouncementScreen({route}) {

  // Initializing variables to chosse which announcements to render
  const [shownAnnouncements,setShownAnnouncements] = useState({});

  /**
   * Sends a http request to the server and changes rendered 
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
        return response.json();
      })

      // Changes rendered annoucements
      .then(data => {
        console.log(data[0]);
        setShownAnnouncements(data[0]);
      })

      // Error failsafe
      .catch(error => {
        console.error('Erreur :', error);
      });  
    }
 
  // Once Screen focused on
  useFocusEffect(
    React.useCallback(() => {
      console.log('AnnouncementScreen');
      
      try {
        
        // Request command changes based on type of screen (offer / request)
        if (route.params.type == "offer") {
          request("get_announcements_offers")
        } else if (route.params.type == "request") {
          request("get_announcements_requests")
        }
        console.log(shownAnnouncements);

      } catch (error) {
        // Error failsafe
        console.error(error)
      }

      return () => {
        // Once you quit the screen
      };
    }, [])
  );


  return (
      <View style = {{flex : 1, backgroundColor : "white"}}>
        <StatusBar backgroundColor="#99cc33"/>

        <ScrollView>

          {/* Rendered announcements */}
          {shownAnnouncements.length > 0 ? 
            Object.values(shownAnnouncements).map( (value, index) => (
            <CreatedItem key = {index} 
                          content = {{type : route.params.type, 
                                      id : value.id,
                                      departure : value.departure,
                                      arrival : value.arrival,
                                      date : value.date,
                                      price : value.price,
                                      nb_seat : value.nb_seat,
                                      comment : value.comment,
                                      conductor:   value.conductor}} 
                          candidates = {value.candidates == null ? [] : value.candidates.split(',')} 
                          passengers = {value.passengers == null ? [] : value.passengers.split(',')} 
                          id = {route.params.id}
                          username = {route.params.username}
                          password = {route.params.password}
                          />
          )) 
          : (
            /* Message when no annoucement was created */ 
            route.params.type == "offer" ? 
              <Text style = {{alignSelf:"center", padding : 20, fontSize : 16}}> Vous n'avez créé aucune Offre </Text>
              : 
              <Text style = {{alignSelf:"center", padding : 20, fontSize : 16}}> Vous n'avez créé aucune Requête </Text>
            )
          }
        </ScrollView>

      </View>
  )
}