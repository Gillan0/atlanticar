import {View, StyleSheet, Text, Pressable, ScrollView, StatusBar, Button, Alert, TextInput, FlatList} from "react-native";
import React, {useState, useRef, useCallback} from 'react';
import RevealView from './../components/RevealView.js';
import OfferItem from "../components/OfferItem.js"
/*
Gray : #cbcbcb
Light blue : #00b8de
Dark blue : #0c2340
Green : #99cc33
*/ 

const CreateOfferItem = props => {
  const [inputs, setInputs] = useState(['', '', '', '', '', '', '']);

  const changeInputs = (text, index) => {
    const newInputs = [...inputs];
    newInputs[index] = text;
    setInputs(newInputs);
  };

  const prompts = ["Départ : ",
                   "Arrivée : ", 
                   "Horaire : ", 
                   "Tarif (en €) : ", 
                   "Places occupées : ", 
                   "Nombre de places maximales : ",
                   "Commentaire :" ];

  function pushButton() {
    let isOfferValid = true;
    let errorMessage = "";
    for (i=0; i<6; i++) {
      if (inputs[i].trim() == "") {
        isOfferValid = false;
        errorMessage = errorMessage + "Le champ '" + prompts[i][0].toLowerCase() + prompts[i].substring(1,prompts[i].length - 3) +  "' est vide\n"
      }

    }
    if (isOfferValid) {
      props.addOffer(inputs);
      
      Alert.alert(title = "Offre créée !", message = "Un conducteur n'a plus qu'à l'accepter") 
      setInputs(['', '', '', '', '', '', ''])
    } else {
      Alert.alert(title = "Erreur !", message = errorMessage)    
    }
    return isOfferValid;
  }

  return (

  <RevealView title = "Créer Offre" style = {styles.createItemTitle} display = {false} buttonStyle = {{text : "Créer une Offre", function:pushButton, color:"#ddb500"}}>    
      <View style = {{backgroundColor : "#fff", borderRadius : 2, padding : 10}}>
        <View style = {{paddingBottom : 10}}>
        {prompts.map((value,index) => (
          <View style = {{flex : 1, flexDirection : "row"}}>
            <Text style = {{fontSize : 15, color : '#000000', alignSelf : "center"}} >{value}</Text>
            <TextInput style = {styles.input} onChangeText={(text) => changeInputs(text, index)}/>
          </View>
         ))}
        </View>
      </View>
  </RevealView>   
  
  
  )
};

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

export default function OfferScreen() {

  const [shownOffers,setShownOffers] = useState([]);

  const addOffer = (inputs) => {
    const newOffer = {
      id: dataOffers.length,
      start: inputs[0],
      end: inputs[1],
      date: inputs[2],
      toPay: inputs[3],
      occupiedPlaces: inputs[4],
      totalPlaces: inputs[5],
      comment: inputs[6]
    };
  
    const newOffers = [...shownOffers, newOffer]; 
    dataOffers = newOffers;
    setShownOffers(newOffers); 
  };

  const filterShownOffers = (inputs) => {
    let filteredOffers = [];
    if (arraysEqual(inputs,["","","",""])) {
      setShownOffers(dataOffers);
    } else {
      if (inputs[0].trim() != "") {
        for (i=0;i<dataOffers.length;i++) {
          if (dataOffers[i].start.trim().toUpperCase().includes(inputs[0].trim().toUpperCase())) {
            filteredOffers.push(dataOffers[i]);
          }
        }
      }
      if (inputs[1].trim() != "") {
        for (i=0;i<dataOffers.length;i++) {
          if (dataOffers[i].end.trim().toUpperCase().includes(inputs[1].trim().toUpperCase())) {
            filteredOffers.push(dataOffers[i]);
          }
        }
      }

      setShownOffers(filteredOffers); 
    }
  }

  function test(id) {
    dataOffers[id].occupiedPlaces = dataOffers[id].occupiedPlaces + 1;
    Alert.alert(title = "Candidature enregistrée !", message = "Le conducteur n'a plus qu'à la valider");
    return true
  }

  function request() {
    // Données à envoyer
  const dataToSend = {
    username: 'user1',
    password: 'pwd1234'
  };
  
  // Options de la requête
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend) // Convertir les données en format JSON
  };
  
  // URL de l'endpoint où envoyer les données
  const url = 'http://192.168.43.48:3000';
  
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
      console.log('Réponse du serveur :', data.msg);
      setShownOffers(data.offers);
    })
    .catch(error => {
      console.error('Erreur :', error);
    });  
  }


  // <CreateOfferItem addOffer = {addOffer}/>
  return (
    <View style = {{flex : 1, backgroundColor : "white"}}>
      <StatusBar backgroundColor="#99cc33"/>
      <Button onPress={request} title="Connecter"/>
        <ScrollView>
        <FilterItem changeShownOffers={filterShownOffers}/>
        {shownOffers.map((item) =>   <OfferItem key ={item.id}
                                      style = {styles.offerItemDetails} 
                                      offer = {item}
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