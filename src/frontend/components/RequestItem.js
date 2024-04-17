import React, { useState } from 'react';
import { Platform, UIManager, Pressable, View, Text, Button, LayoutAnimation, StyleSheet, Alert, Image } from 'react-native';
import url from "./url.js"


if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const RequestItem = props => {  
  function toCandidate() {
    Alert.alert("Fonctionnalité à venir", "Lors de la V2")
    return;
    const dataToSend = {
      username: 'user1',
      password: 'pwd1234',
      request : props.request,
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
  

  return (
    <View style = {styles.mainContainer}>
        <View style = {{...styles.titleContainer}}>
          <View style = {{flexDirection : "row", justifyContent : "space-between"}}>
            <Text style = {styles.defaultText}>Par {props.request.author}</Text>
            <Text style = {styles.defaultText}>{props.request.price} €</Text>
          </View>

          <View style = {{flexDirection : "row", flex : 1}}>
            <View style = {{flexDirection : "column"}}>
              <View style = {{alignSelf : "center", borderWidth: 4, borderColor: 'white', borderRadius : 10, width : 20, height : 20}}/>
              <View style = {{alignSelf : "center", height: '85%',width :0,  borderWidth: 3, borderColor: 'white', borderStyle: 'dashed'}}/>
              <View style = {{alignSelf : "center", borderWidth: 4, borderColor: 'white', borderRadius : 10, width : 20, height : 20}}/>
            </View>
            <View style = {{flexDirection : "column", flex : 1}}>
                <Text style = {styles.destinations}>De {props.request.departure}</Text>
              <View>
                <View>
                  <Text style = {styles.defaultText}>Le {props.request.date.substring(8,10)}/{props.request.date.substring(5,7)}/{props.request.date.substring(2,4)} à {props.request.date.substring(11,13)}h{props.request.date.substring(14,16)}</Text>
                </View>
                <View style = {styles.revealContainer}>  
                  <View style = {styles.commentContainer}>
                    <Text style = {{...styles.defaultText, fontWeight : 'bold'}}>Infos supplémentaires :</Text>
                    <Text style = {styles.defaultText}>{props.request.comment}</Text>
                    <View style={styles.buttonContainer}>
                      <Pressable onPress={toCandidate} style={styles.button}>
                        <Image source={require("../assets/flag.png")} style={{height: 22, width: 22}}/>
                        <Text style={styles.buttonText}> Candidater </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
              <View style = {{flexDirection : "row"}}>
                <Text style = {styles.destinations}>A {props.request.arrival}</Text>
              </View>
            </View>


          </View>
        </View>
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
    backgroundColor : "#00b8de",
    borderRadius : 10,
    padding : 10,
    fontSize : 20
  },
  revealContainer : {
    padding : 10,
  },
  button : {
    flexDirection : "row",
    alignSelf : "center"
  },
  buttonText : {
    color : "#ffffff",
    fontSize : 18,
    fontWeight : 'bold'
  },
  buttonContainer : { 
    margin : 10,
    borderRadius: 10,
    padding: 7,
    backgroundColor: "#99cc33",
    shadowColor: "#000",
    elevation: 5,
    alignSelf : "center",
  }
})

export default RequestItem;