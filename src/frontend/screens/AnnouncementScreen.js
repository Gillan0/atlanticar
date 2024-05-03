import {View, StyleSheet, Text, Pressable, ScrollView, StatusBar} from "react-native";
import React, {useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import CreatedItem from "../components/CreatedItem.js";
import url from "../components/url.js";

export default function AnnouncementScreen({route}) {
  const [shownAnnouncements,setShownAnnouncements] = useState({});
  function request(command,parameters=[]) {
    // Données à envoyer
    const dataToSend = {
      id: route.params.id,
      password: route.params.password,
      command : command,
      parameters : parameters
    };
  
    // Options de la requête
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend) // Convertir les données en format JSON
    };
  
    // Envoi de la requête avec fetch
    fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la requête.');
        }
        return response.json(); // Renvoie les données JSON de la réponse
      })
      .then(data => {
        console.log(data[0]);
        setShownAnnouncements(data[0]);
      })
      .catch(error => {
        console.error('Erreur :', error);
      });  
    }
  useFocusEffect(
    React.useCallback(() => {
      console.log('AnnouncementScreen');
      try {
        if (route.params.type == "offer") {
          request("get_announcements_offers")
        } else if (route.params.type == "request") {
          request("get_announcements_requests")
        }
        console.log(shownAnnouncements);
      } catch (error) {
        console.error(error)
      }

      return () => {
        // Optionnel : nettoyer lorsqu'on quitte l'écran
      };
    }, [])
  );
  return (
      <View style = {{flex : 1, backgroundColor : "white"}}>
        <StatusBar backgroundColor="#99cc33"/>
        <ScrollView>
          {Object.values(shownAnnouncements).map( (value, index) => (
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
                          password = {route.params.password}
                          />
          ))}
        </ScrollView>
      </View>
  )
}