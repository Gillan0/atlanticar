import React, { useState } from 'react';
import { Platform, UIManager, Pressable, View, Text, Button, LayoutAnimation, StyleSheet, Alert, Image } from 'react-native';
import url from "./url.js"


if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default CreatedItem = props => { 
  console.log(props.content.conductor)
  function accept(bool, id_candidate) {
    const dataToSend = {
      id: props.id,
      password: props.password,
      command : props.content.type=="offer" ? (bool ? "accept_application_offer"  : "refuse_application_offer") : (bool ? "accept_application_request"  : "refuse_application_request"),
      parameters : props.content.type=="offer" ? [[id_candidate, props.content.id], [id_candidate, props.content.id, props.id], [props.content.id]] : [[id_candidate, props.content.id, props.id], [id_candidate,props.content.id]],
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
          Alert.alert("Erreur de connexion", "Vérifier que l'état de la connexion")
          throw new Error('Erreur lors de la requête.');
        }
        return response.json(); // Renvoie les données JSON de la réponse
      })
      .then(data => {
        return;
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
    
  }
  return (
    <View style = {styles.mainContainer}>
        <View style = {{...styles.titleContainer}}>
          <View style = {{flexDirection : "row", flex : 1}}>
            <View style = {{flexDirection : "column"}}>
              <View style = {{alignSelf : "center", borderWidth: 4, borderColor: 'black', borderRadius : 10, width : 20, height : 20}}/>
              <View style = {{alignSelf : "center", height: '80%',width :0,  borderWidth: 3, borderColor: 'black', borderStyle: 'dashed'}}/>
              <View style = {{alignSelf : "center", borderWidth: 4, borderColor: 'black', borderRadius : 10, width : 20, height : 20}}/>
            </View>
            <View style = {{flexDirection : "column", flex : 1}}>
                <Text style = {styles.destinations}>De {props.content.departure}</Text>
              <View>
                <View>
                  <Text style = {styles.defaultText}>Le {props.content.date.substring(8,10)}/{props.content.date.substring(5,7)}/{props.content.date.substring(2,4)} à {props.content.date.substring(11,13)}h{props.content.date.substring(14,16)}</Text>
                </View>
                <View style = {styles.revealContainer}>  
                  <View>
                    {props.candidates.length > 0 && <Text style = {{...styles.defaultText, fontWeight : 'bold'}}>Candidatures : </Text> }
                      {Object.values(props.candidates).map((value, key) => 
                            <View key = {key} style = {{flexDirection : "row", justifyContent : "space-between"}}>                
                                <Text style = {styles.defaultText}>{value.split(":")[1]}</Text>
                                <View style = {{flexDirection : "row"}}>    
                                    <Pressable onPress = {()=> accept(true, parseInt(value.split(":")[0]))}>
                                        <Image source = {require("../assets/checkmark.png")} style = {{width : 30, height : 30, marginRight: 15}}/>
                                    </Pressable>
                                    <Pressable onPress = {()=> accept(false, parseInt(value.split(":")[0]))}>
                                      <Image source = {require("../assets/cross.png")} style = {{width : 30, height : 30, marginLeft: 15}}/>
                                    </Pressable>
                                </View>
                            </View>
                        )}
                    {props.passengers.length > 0 && <Text style = {{...styles.defaultText, fontWeight : 'bold'}}>Passagers déjà validés : </Text>}
                      {Object.values(props.passengers).map((value, key) => 
                            <View key = {key} style = {{flexDirection : "row", justifyContent : "space-between"}}>                
                                <Text style = {styles.defaultText}>{value.split(":")[1]}</Text>
                                <View style = {{flexDirection : "row"}}>    
                                    <Pressable>
                                      <Image source = {require("../assets/cross.png")} style = {{width : 30, height : 30, marginLeft: 15}}/>
                                    </Pressable>
                                </View>
                            </View>
                        )} 
                      {props.content.conductor !== null && (
                          <>
                            <Text style = {{...styles.defaultText, fontWeight : 'bold'}}>Conducteur : </Text>
                            <View style = {{flexDirection : "row", justifyContent : "space-between"}}>                
                                <Text style = {styles.defaultText}>{props.conductor}</Text>
                                <View style = {{flexDirection : "row"}}>    
                                    <Pressable>
                                      <Image source = {require("../assets/cross.png")} style = {{width : 30, height : 30, marginLeft: 15}}/>
                                    </Pressable>
                                </View>
                            </View>
                          </>
                          )
                      }
                  </View>
                </View>
              </View>
              <View style = {{flexDirection : "row"}}>
                <Text style = {styles.destinations}>A {props.content.arrival}</Text>
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
    color : "#000",
    fontWeight : "bold",
  },
  defaultText : {
    fontSize :  14,
    padding : 5,
    color : "#000",
  },
  mainContainer : {
    color : "#111111",
    borderRadius : 10,
    margin : 10,
    shadowColor: "#000",
    elevation: 5,
  },
  titleContainer : {
    backgroundColor : "#efefef",
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
    color : "#000",
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