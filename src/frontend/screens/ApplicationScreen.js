import {View, ScrollView, StatusBar, Text, Image, Alert} from "react-native";
import React, {useState} from 'react';
import ApplicationItem from "../components/ApplicationItem";
import { useFocusEffect } from '@react-navigation/native';
import url from "../misc/url";
import endScrollReached from "../checkFunctions/endScrollReached";

/**
 * Displays the user's applications (offer or request)
 * 
 * @param {Route<string>} route -  Navigation route
 * @returns 
 */
export default function ApplicationScreen({route}) {

  // Initializing variables to chosse which applications to render
  const [shownApplications,setShownApplications] = useState([]);
  const [page, setPage] = useState(0);

  // Initializing variable for loading wheel
  const [waitForServer, setWaitForServer] = useState(true);

  /**
   * Sends a HTTP request to the server and changes rendered 
   * announcements based on answer
   * 
   * @param {String} command - command interpreted by server
   * @param {number} newPage - parameters for the sql script 
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
        return response.json(); // Renvoie les données JSON de la réponse
      })

      // Changes rendered applications
      .then(data => {
        console.log(data[0]);
        if (shownApplications.length % 5 == 0) {
          setShownApplications([...shownApplications, ...data[0]]);
        }
        else {
          setShownApplications([...shownApplications.slice(0, - (shownApplications.length % 5)), ...data[0]])
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
      console.log('Applicationscreen');
      try {
        setPage(0)
        setWaitForServer(true)
        // Request command changes based on type of screen (offer / request)
        if (route.params.type == "offer") {
          request("get_applications_offers", page)
        } else if (route.params.type == "request") {
          request("get_applications_requests", page)
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
        
        <ScrollView
        onScroll={({nativeEvent}) => {
            if (endScrollReached(nativeEvent) && shownApplications.length > 0) {
              
              if (shownApplications.length % 5 == 0) {
              
                if (route.params.type == "offer") {
              
                  request("get_applications_offers", page + 1)
              
                } else if (route.params.type == "request") {
              
                  request("get_applications_requests", page + 1)
              
                }
              
              } else {
              
                if (route.params.type == "offer") {
                  
                  request("get_applications_offers", page)
              
                } else if (route.params.type == "request") {
              
                  request("get_applications_requests", page)
              
                }
              
              }
            
            }
          }}
          scrollEventThrottle={16}
          
        >
          { shownApplications.length <= 0 && !waitForServer &&
            /* Message when no application was created */ 
              <Text style = {{alignSelf:"center", padding : 20, fontSize : 16}}>
                  {route.params.type == "offer" ? 
                      "Vous n'avez candidaté à aucune Offre " 
                      : "Vous n'avez candidaté à aucune Requête "} 
              </Text>
             
            
          }


          {/* Rendered applications */}
          {
            shownApplications.map( (value, index) => (
                <ApplicationItem key = {index} content = {{...value, type : route.params.type}} account = {route.params}/>
              ))
          }

          <View style={{minHeight : 70, maxHeight : shownApplications.length > 0 ? 60 : null,justifyContent: "center", alignItems: "center" }}>
                {
                  waitForServer &&
                  <Image source={require("../assets/loading.gif")} style={{ maxWidth: 50, maxHeight: 50, padding: 20 }} />
                }
          </View>
          
        </ScrollView>
      
      </View>
    )
}