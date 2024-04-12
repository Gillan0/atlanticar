import React, { useState } from 'react';
import { Platform, UIManager, Pressable, View, Text, Button, LayoutAnimation, StyleSheet, Alert } from 'react-native';
import url from "./url.js"

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const OfferItem = props => {  
  const [display, setDisplay] = useState(false);

  function toggle() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setDisplay(!display);
  };

  function toCandidate() {
    const dataToSend = {
      username: 'user1',
      password: 'pwd1234',
      msg : "Je candidate à une offre",
      offer : props.offer,
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
          Alert.alert("Erreur de connexion", "Vérifier que l'état de la connexion")
        } else {
          Alert.alert("Candidature envoyée", "Le conducteur n'a plus qu'à y répondre")
        }
        return response.json(); // Renvoie les données JSON de la réponse
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
    
  }
  

  const displayColor = display ? "#11c9ef" : "#00b8de";

  return (
    <View style = {styles.mainContainer}>
      <Pressable onPress = {toggle}>
        <View style = {{...styles.titleContainer, backgroundColor : displayColor}}>
          <View style = {{flexDirection : "row", justifyContent : "space-between"}}>
            <Text style = {styles.defaultText}>Par {props.offer.author}</Text>
            <Text style = {styles.defaultText}>{props.offer.price} €</Text>
          </View>
          <View style = {{flexDirection : "row", justifyContent : "space-between"}}>
            <Text style = {styles.destinations}>De {props.offer.departure}</Text>
            <Text style = {styles.destinations}>A {props.offer.arrival}</Text>
          </View>
          <View style = {{ flexDirection : "row", justifyContent : "space-between"}}>
            <Text style = {styles.defaultText}>Le {props.offer.date} </Text>
            <Text style = {styles.defaultText}>{props.offer.places} place(s) restante(s)</Text>
          </View>
        </View>
        </Pressable>
        {display && (
        <View style = {styles.revealContainer}>  
          <View style = {styles.commentContainer}>
            <Text >Commentaire :</Text>
            <Text >{props.offer.comment}</Text>
          </View>
          <Button title={"Candidater"} color = {"#ddb500"} onPress={toCandidate}/>
        </View>
        )
        }
    </View>
  )
};
const styles = StyleSheet.create({
  destinations : {
    fontSize :  20,
    padding : 5,
    color : "#fff",
    fontWeight : "bold"
  },
  defaultText : {
    fontSize :  14,
    padding : 5,
    color : "#fff",
  },
  mainContainer : {
    backgroundColor : "#fff",
    color : "#111111",
    borderRadius : 10,
    margin : 10,
    shadowColor: "#000",
    elevation: 5,
  },
  titleContainer : {
    backgroundColor : "#99cc33",
    borderRadius : 10,
    padding : 10,
    fontSize : 20
  },
  commentContainer : {
    padding : 10,
  },
  revealContainer : {
    padding : 10,
    alignContent : "center"
  }
})

export default OfferItem;