import {View, StyleSheet, Text, Pressable, ScrollView, StatusBar, Button, Alert, TextInput, Image} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import React, {useState, useRef, useCallback} from 'react';
import OfferItem from "../components/OfferItem.js";
import SearchItem from "../components/SearchItem.js";
import url from "../components/url.js";
/*
Gray : #cbcbcb
Light blue : #00b8de
Dark blue : #0c2340
Green : #99cc33
*/ 

export default function OfferScreen({route}) { 

  const [shownOffers,setShownOffers] = useState([]);

  function request(command,parameters=['','','','9999']) {
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
          Alert.alert("PAS CONNECTÉ")
        }
        return response.json(); // Renvoie les données JSON de la réponse
      })
      .then(data => {
        console.log('Empty data', data==[]);
        setShownOffers(data);
      })
      .catch(error => {
        console.error('Erreur :', error);
      });  
    }
  useFocusEffect(
    React.useCallback(() => {
      console.log('OfferScreen');
      
      try {
        request('get_default_offers')
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
          <SearchItem request={request} type="offer"/>
            {shownOffers.map((item) =>   <OfferItem key ={item.id}
                                      account = {route.params}
                                      style = {styles.offerItemDetails} 
                                      offer = {item}
                                      />)}
            <View style = {{backgroundColor : "white", flex : 1, padding : 50}}/>
          </ScrollView>
          <View style={{position:"absolute", 
                    alignSelf:"flex-end",
                    bottom:10,
                    right : 10,
                    elevation : 5}}>
          <Pressable onPress = {() => Alert.alert("Fonctionnalité à implémenter", "Lors de la V3")}>
 
              <Image source = {require("../assets/plus-button.png")} style={{maxWidth : 60, maxHeight : 60}}/>    
          
          </Pressable>
        </View>
    </View>
    );
};


const styles = StyleSheet.create({
  offerItemContainer : {
    colorInactiveTitle : "#00b8de",
    colorActiveTitle : "#99cc33",
    titleSize : 15,
    titleColor : "#ffffff",
    titleBorderRadius : 10,
    titlePadding : 10,
    margin : 7,
    childrenPadding : 10,
    childrenBorderRadius : 10,
    childrenBackgroundColor : "#55fcff"
  },
  offerItemDetails : {
    buttonColor : "#ddb500",
    textFontSize :  15,
    textColor : "#000000"
  },
  input : {
    height: 30,
    margin: 12,
    borderWidth: 1,
    padding: 5,
    paddingLeft : 7,
    paddingRight : 7,
    borderRadius : 10,
    flex : 1
  },
  createItemTitle : {
    colorInactiveTitle : "#ddb500",
    colorActiveTitle : "#ddb500",
    titleSize : 15,
    titleColor : "#ffffff",
    titleBorderRadius : 10,
    titlePadding : 10,
    margin : 5,
    childrenPadding : 10,
    childrenBorderRadius : 10,
    childrenBackgroundColor : "#fff"
  },
  filterItemTitle : {
    colorInactiveTitle : "#a9a9a9",
    colorActiveTitle : "#a9a9a9",
    titleSize : 15,
    titleColor : "#ffffff",
    titleBorderRadius : 0,
    titlePadding : 10,
    margin : 0,
    childrenPadding : 10,
    childrenBorderRadius : 10,
    childrenBackgroundColor : "#fff"
  }
});