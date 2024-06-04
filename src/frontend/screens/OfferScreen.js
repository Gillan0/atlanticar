import {View, StyleSheet, Text, Pressable, ScrollView, StatusBar, Image} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import React, {useState} from 'react';
import OfferItem from "../components/OfferItem.js";
import SearchItem from "../components/SearchItem.js";
import url from "../misc/url.js";
import { useNavigation } from '@react-navigation/native';
import endScrollReached from "../checkFunctions/endScrollReached.js";
import isArrayEqual from "../checkFunctions/isArrayEqual.js";


export default function OfferScreen({route}) { 
  const navigation = useNavigation();
  const [page, setPage] = useState(0);
  const [lastCommand, setLastCommand] = useState("get_default_offers");
  const [lastParams, setLastParams] = useState(['','','','9999']);
  const [shownOffers,setShownOffers] = useState([]);
  const [waitForServer, setWaitForServer] = useState(true);

  function request(command, newPage, parameters=['','','','9999'], reset=false) {
    console.log(lastParams)
    // Données à envoyer
    const dataToSend = {
      id: route.params.id,
      password: route.params.password,
      command : command,
      parameters : [...parameters, reset ? 0 : (shownOffers.length % 20 == 0 ? newPage : page)]
    };
    // Options de la requête
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend) // Convertir les données en format JSON
    };

    setWaitForServer(true)
    // Envoi de la requête avec fetch
    fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la requête.');
        }
        return response.json(); // Renvoie les données JSON de la réponse
      })
      .then(data => {
        if (data[0].length <= 0) {
          setShownOffers([])
          setPage(0)
          setLastCommand(command)
          setLastParams(parameters)
          setWaitForServer(false)
          return;
        }

        if (shownOffers.length % 20 == 0) {
          if (lastCommand === command && isArrayEqual(lastParams,parameters) && !reset){
            setPage(newPage)
            setShownOffers([...shownOffers, ...data[0]])
          } else {
            setPage(0)
            setShownOffers(data[0])
          }
        } else {
          if (lastCommand === command && isArrayEqual(lastParams,parameters) && !reset){
            setPage(newPage)
            setShownOffers([...shownOffers.slice(0, - shownOffers.length % 20), ...data[0]]);
          } else {
            setPage(0)
            setShownOffers(data[0])
          }
        }
        setLastCommand(command)
        setLastParams(parameters ? parameters : [])
        setWaitForServer(false)
        }
      )
      .catch(error => {
        console.error('Erreur :', error);
      });  
    }
  useFocusEffect(
    React.useCallback(() => {
      console.log('OfferScreen');
      try {
        setPage(0)
        setShownOffers([])
        request('get_default_offers', 0, ['','','','9999'], true)
      } catch (error) {
        console.error(error)
      }

      return () => {
        // Optionnel : nettoyer lorsqu'on quitte l'écran
        
        setPage(0)
        setShownOffers([])
      };
    }, [])
  );
  return (
    <View style = {{flex : 1, backgroundColor : "white"}}>
      <StatusBar backgroundColor="#99cc33"/>  
        <ScrollView 
        onScroll={({nativeEvent}) => {
            if (endScrollReached(nativeEvent) && shownOffers.length > 0) {
              if (shownOffers.length % 20 == 0) {
                request(lastCommand, page + 1, lastParams, false)
              } else {
                request(lastCommand, page, lastParams, false)
              }
            }
          }}
          scrollEventThrottle={16}
          >
          <SearchItem request={request} type="offer"/>
            { shownOffers.length <= 0 && !waitForServer &&
              <Text style = {{alignSelf : "center", padding : 10, fontSize : 16}}> 
                      {lastCommand == "get_default_offers" ?
                        "Aucune Offre n'est disponible pour le moment" 
                        : "Aucune Offre ne correspond à votre recherche"
                        }
              </Text>
            }
            {
              shownOffers.map((item, index) =>   <OfferItem key ={index}
                                      account = {route.params}
                                      offer = {item}
                                      />)
            }
            <View style={{minHeight : 70, maxHeight : shownOffers.length > 0 ? 60 : null,justifyContent: "center", alignItems: "center" }}>
                {
                  waitForServer &&
                  <Image source={require("../assets/loading.gif")} style={{ maxWidth: 50, maxHeight: 50, padding: 20 }} />
                }
            </View>
          </ScrollView>
          
          <View style={{position:"absolute", 
                    alignSelf:"flex-end",
                    bottom:10,
                    right : 10,
                    elevation : 5}}>
            <Pressable onPress = {() => navigation.navigate("CreateOffer")}>
                <Image source = {require("../assets/plus-button.png")} style={{maxWidth : 60, maxHeight : 60}}/>             
            </Pressable>
          </View>
    </View>
    );
};