import {View, StyleSheet, Text, Pressable, ScrollView, StatusBar, Button, Alert, TextInput, FlatList} from "react-native";
import React, {useState, useCallback} from 'react';
import RevealView from './../components/RevealView.js';
import RequestItem from './../components/RequestItem.js';
import url from "../components/url.js";
/*
Gray : #cbcbcb
Light blue : #00b8de
Dark blue : #0c2340
Green : #99cc33
*/ 



const FilterItem= props => {
  const [inputs, setInputs] = useState(['', '', '', '']);

  const changeInputs = (text, index) => {
    const newInputs = [...inputs];
    newInputs[index] = text;
    setInputs(newInputs);
  };

  const prompts = ["Départ : ",
                   "Arrivée : ", 
                   "Horaire : ", 
                   "Tarif (en €) : "];

  function pushButton() {
    props.changeShownOffers(inputs);
    return false;
  }

  return (
  <RevealView title = "Filtre" 
              style = {styles.filterItemTitle} display = {false} 
              buttonStyle = {{text : "Filtrer", function:pushButton, color:"#ddb500"}}
              >    
      <View style = {{backgroundColor : "#fff", borderRadius : 2, padding : 10}}>
        <View style = {{paddingBottom : 10}}>
        {prompts.map((value,index) => (
          <View key = {index} style = {{flex : 1, flexDirection : "row"}}>
            <Text style = {{fontSize : 15, color : '#000000', alignSelf : "center"}} >{value}</Text>
            <TextInput style = {styles.input} onChangeText={(text) => changeInputs(text, index)}/>
          </View>
         ))}
        </View>
      </View>
  </RevealView>   
  
  
  )
};


function test(id) {
  dataRequests[id].occupiedPlaces = dataRequests[id].occupiedPlaces + 1; 
  Alert.alert(title = "Candidature enregistrée !", message = "LOREM IPSUM SA MERE");
  return true
}
export default function RequestScreen() {

  const [shownRequests,setShownRequests] = useState([]);

  const addRequest = (inputs) => {
    const newRequest = {
      id: dataRequests.length,
      start: inputs[0],
      end: inputs[1],
      date: inputs[2],
      toPay: inputs[3],
      occupiedPlaces: inputs[4],
      totalPlaces: inputs[5],
      comment: inputs[6]
    };
  
    const newRequests = [...shownRequests, newRequest]; 
    dataRequests = newRequests;
    setShownRequests(newRequests); 
  };

  const filterShownRequests = (inputs) => {};
  
  function request(user,pwd,command,type,parameters=[]) {
    // Données à envoyer
    const dataToSend = {
      username: user,
      password: pwd,
      command : command,
      type : type,
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
        console.log('Réponse du serveur :', data);
        setShownRequests(data);
      })
      .catch(error => {
        console.error('Erreur :', error);
      });  
  }


  return (
    <View style = {{flex : 1, backgroundColor : "white"}}>
      <StatusBar backgroundColor="#99cc33"/>
        <ScrollView>
        <Button onPress={() => request('default_user','default_pwd','get','default_requests')} title="Connecter"/>
        <FilterItem changeShownRequests={filterShownRequests}/>
        {shownRequests.map((item) =>   <RequestItem key ={item.id}
                                      style = {styles.RequestItemDetails} 
                                      request = {item}
                                      />)}
        <View style = {{backgroundColor : "white", flex : 1, padding : 50}}/>
        </ScrollView>
          <View style={{position:"absolute", 
                    backgroundColor:"#ddb500", 
                    paddingTop : 8, paddingBottom : 10, paddingRight : 20, paddingLeft : 20, 
                    alignSelf:"flex-end",
                    borderRadius: 40,
                    bottom:10, right : 10}}>
          <Pressable onPress = {() => Alert.alert("Fonctionnalité à implémenter", "Lors de la V3")}>
 
              <Text style={{color:"#fff", fontSize: 30}}>+</Text>    
          
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