import { View, StatusBar, ScrollView} from "react-native";
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import url from "../misc/url";
import NotificationItem from "../components/NotificationItem";

/**
 * Écran affichant les notifications d'un utilisateur
 * @returns 
 */
function NotificationScreen({ route }) {
  const [notifications, setNotifications] = useState([]);
  
  /**
   * Gère la requête serveur afin d'obtenir les notifications
   */
  const getNotifications = async () => {
    const dataToSend = {
      id: route.params.id,
      password: route.params.password,
      command: "get_notifications",
      parameters: [route.params.id],
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    };

    fetch(url, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erreur lors de la requête.');
            }
            return response.json();
        })  
        .then((data) => {
            setNotifications(data[0]); 
        })
        .catch((error) => {
            console.error(error.message)
        })
  };

  useFocusEffect(
    useCallback(() => {
      getNotifications(); // Appel initial pour charger les notifications
      return () => {
        // Nettoyage optionnel
      };
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="#99cc33" />
      <ScrollView>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </ScrollView>
    </View>
  );
}

export default NotificationScreen;