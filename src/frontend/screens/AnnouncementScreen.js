import {View, StyleSheet, Text, Pressable, ScrollView, StatusBar, Button, Alert, TextInput, FlatList} from "react-native";
import React, {useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import CreatedItem from "../components/CreatedItem.js";
import url from "../components/url.js";

function unpack(data) {
  let result = {};
  for (i=0;i<data.length;i++) {
    let tmp = data[i]
    
    if (result.id == undefined) {
      result[tmp.id] = {content : {id : tmp.id, type : tmp.type, departure : tmp.departure, arrival : tmp.arrival, date : tmp.date},
                  candidats :[{id : tmp.id_candidat, user : tmp.candidat}]}
    } else {
      result.id.candidats.push({id : tmp.id_candidat, user : tmp.candidat})
    }
  }
  return result;
}

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
        console.log(data);
        setShownAnnouncements(unpack(data[0]));
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
          {Object.keys(shownAnnouncements).map( (id) => (
            <CreatedItem key = {id} 
                          content = {shownAnnouncements[id].content} 
                          candidats = {shownAnnouncements[id].candidats} 
                          id = {route.params.id}
                          password = {route.params.password}
                          />
          ))}
        </ScrollView>
      </View>
  )
}