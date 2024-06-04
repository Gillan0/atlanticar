import {View, Text, ScrollView, StatusBar, Image} from "react-native";
import React, {useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import CreatedItem from "../components/CreatedItem.js";
import url from "../misc/url.js";
import endScrollReached from "../checkFunctions/endScrollReached.js";

/**
 * Displays the user's created announcements (offer or request)
 * 
 * @param {Route<string>} route -  Navigation route
 * @returns 
 */
export default function AnnouncementScreen({route}) {

  // Initializing variables to chosse which announcements to render
  const [shownAnnouncements,setShownAnnouncements] = useState([]);
  const [page, setPage] = useState(0);

  // Initializing variable for loading wheel
  const [waitForServer, setWaitForServer] = useState(true);

  /**
   * Sends a http request to the server and changes rendered 
   * announcements based on answer
   * 
   * @param {String} command - command interpreted by server
   * @param {number} newPage - parameter for the sql script 
   */
  function request(command, newPage) {

    // Data to send to server
    const dataToSend = {
      id: route.params.id,
      password: route.params.password,
      command : command,
      parameters : [5*newPage]
    };
  
    // HTTP request options
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend) // Data converted to JSON format
    };
  
    setWaitForServer(true)
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
        if (shownAnnouncements.length % 5 == 0) {  
          setShownAnnouncements([...shownAnnouncements, ...data[0]]);
        }
        else {
          setShownAnnouncements([...shownAnnouncements.slice(0, - shownAnnouncements.length % 5), ...data[0]])
        }
        setPage(newPage)
        setWaitForServer(false)
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
        setPage(0);
        // Request command changes based on type of screen (offer / request)
        if (route.params.type == "offer") {
          request("get_announcements_offers", page)
        } else if (route.params.type == "request") {
          request("get_announcements_requests", page)
        }
        console.log(shownAnnouncements);
        setWaitForServer(true);

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

        <ScrollView
        onScroll={({nativeEvent}) => {
            if (endScrollReached(nativeEvent) && shownAnnouncements.length > 0) {
              
              if (shownAnnouncements.length % 5 == 0) {
              
                if (route.params.type == "offer") {
              
                  request("get_announcements_offers", page + 1)
              
                } else if (route.params.type == "request") {
              
                  request("get_announcements_requests", page + 1)
              
                }
              
              } else {
              
                if (route.params.type == "offer") {
                  
                  request("get_announcements_offers", page)
              
                } else if (route.params.type == "request") {
              
                  request("get_announcements_requests", page)
              
                }
              
              }
            
            }
          }}
          scrollEventThrottle={16}
          >

          
          { shownAnnouncements.length <= 0 && !waitForServer &&
            /* Message when no annoucement was created */ 
              <Text style = {{alignSelf:"center", padding : 20, fontSize : 16}}>
                  {route.params.type == "offer" ? 
                      "Vous n'avez créé aucune Offre " 
                      : "Vous n'avez créé aucune Requête "} 
              </Text>
             
            
          }


          {/* Rendered announcements */}
          {
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
          }

          <View style={{minHeight : 70, maxHeight : shownAnnouncements.length > 0 ? 60 : null,justifyContent: "center", alignItems: "center" }}>
                {
                  waitForServer &&
                  <Image source={require("../assets/loading.gif")} style={{ maxWidth: 50, maxHeight: 50, padding: 20 }} />
                }
            </View>


        </ScrollView>

      </View>
  )
}