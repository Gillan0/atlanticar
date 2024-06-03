import { View, StatusBar, ScrollView} from "react-native";
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import url from "../misc/url";
import NotificationItem from "../components/NotificationItem";

/**
 * Écran affichant les notifications d'un utilisateur
 * 
 * @param {Route<string>} route - Navigation route
 * @returns {React.ReactElement} 
 */
function NotificationScreen({ route }) {
  const [notifications, setNotifications] = useState([]);
  
  /**
     * Sends a HTTP request to the server and changes rendered 
     * notifications based on answer
     * 
     */
  const getNotifications = async () => {
    
    // Data to send to server
    const dataToSend = {
      id: route.params.id,
      password: route.params.password,
      command: "get_notifications",
      parameters: [route.params.id],
    };

    // HTTP request options
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    };

    // Sends HTTP request
    fetch(url, requestOptions)

        // Checks if answer exploitable
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erreur lors de la requête.');
            }
            return response.json();
        })  
        
        .then((data) => {
            // Changes rendered notifications
            setNotifications(data[0]); 
        })

        // Error failsafe
        .catch((error) => {
            console.error(error.message)
        })
  };

  useFocusEffect(
    useCallback(() => {
      // Initial call to render notifications
      getNotifications(); 
      return () => {
        // Optionnal : Clean screen
      };
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      
      <StatusBar backgroundColor="#99cc33" />
      
      <ScrollView>
      
        {/* Rendered notifications */}
        
        {notifications.length > 0 ?
          notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))
          /* Message when no notification around */
        
          : <Text style = {{alignSelf : "center", padding : 10, fontSize : 16}}> Aucune notification disponible </Text>
        }
      
      </ScrollView>
    
    </View>
  );
}

export default NotificationScreen;