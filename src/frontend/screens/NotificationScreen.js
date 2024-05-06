import { View, Text, StatusBar, ScrollView, Alert } from "react-native";
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import url from "../components/url";

// Composant pour une notification individuelle
const NotificationItem = (props) => {
  return (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
      <Text style={{ fontSize: 12, color: 'black' }}>Le {props.notification.date.substring(8,10)}/{props.notification.date.substring(5,7)}/{props.notification.date.substring(2,4)} à {props.notification.date.substring(11,13)}h{props.notification.date.substring(14,16)}</Text>
      <Text style={{ fontSize: 18, color: 'black' }}>{props.notification.message}</Text>
    </View>
  );
};

export default function NotificationScreen({ route }) {
  const [notifications, setNotifications] = useState([]);

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
