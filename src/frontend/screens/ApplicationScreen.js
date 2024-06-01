import {View, ScrollView, StatusBar} from "react-native";
import React, {useState} from 'react';
import ApplicationItem from "../components/ApplicationItem";
import { useFocusEffect } from '@react-navigation/native';
import url from "../misc/url";

export default function ApplicationScreen({route}) {
  const [shownApplications,setShownApplications] = useState([]);
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
        setShownApplications(data[0]);
      })
      .catch(error => {
        console.error('Erreur :', error);
      });  
    }
  useFocusEffect(
    React.useCallback(() => {
      console.log('Applicationscreen');
      try {
        if (route.params.type == "offer") {
          request("get_applications_offers")
        } else if (route.params.type == "request") {
          request("get_applications_requests")
        }
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
        {shownApplications.map( (value, index) => (
            <ApplicationItem key = {index} content = {{...value, type : route.params.type}} account = {route.params}/>
          ))}
        </ScrollView>
      </View>
    )
}