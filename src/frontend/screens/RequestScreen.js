import {View, StyleSheet, Text, Pressable, ScrollView, StatusBar, Button, Alert, TextInput, FlatList} from "react-native";
import React, {useState, useCallback} from 'react';
import RevealView from './../components/RevealView.js';
import RequestItem from './../components/RequestItem.js';

/*
Gray : #cbcbcb
Light blue : #00b8de
Dark blue : #0c2340
Green : #99cc33
*/ 

const CreateRequestItem = props => {
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

  function addRequest() {
    let isRequestValid = true;
    let errorMessage = "";
    for (i=0; i<6; i++) {
      if (inputs[i].trim() == "") {
        isRequestValid = false;
        errorMessage = errorMessage + "Le champ '" + prompts[i][0].toLowerCase() + prompts[i].substring(1,prompts[i].length - 3) +  "' est vide\n"
      }

    }
    if (isRequestValid) {
      dataRequests.push({id : dataRequests.length, 
                  start : inputs[0], 
                  end : inputs[1], 
                  date : inputs[2], 
                  toPay : inputs[3],
                  occupiedPlaces : inputs[4],
                  totalPlaces : inputs[5],
                  comment : inputs[6]
    })
      Alert.alert(title = "Requête créée !", message = "Un conducteur n'a plus qu'à vous répondre") 
      setInputs(['', '', '', '', '', '', ''])
    } else {
      Alert.alert(title = "Erreur !", message = errorMessage)    
    }
    return isRequestValid;
  }

  return (

  <RevealView title = "Créer Requête" style = {styles.createItemTitle} display = {false} buttonStyle = {{text : "Créer une Requête", function:addRequest, color:"#ddb500"}}>    
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

const FilterScreen = props => {
  const [display, setDisplay] = useState("none");

  function toggle(display) {
    if (display == "none") { 
      setDisplay("flex");
    } else {
      setDisplay("none");
    }
  };
  
  return (
  <View style = {{justifyContent : "center"}}>
      <Pressable onPress = {() => toggle(display)}>
        <View style = {{backgroundColor : "#a9a9a9", padding : 10,  borderRadius : 2}}>
          <Text style = {{fontSize : 15, color : '#ffffff', alignSelf : "center", fontWeight : "bold"}} >Filtres</Text>
        </View>
      </Pressable>            
      <View style = {{display : display, backgroundColor : "#fff", borderRadius : 2, padding : 10}}>
        <View style = {{paddingBottom : 10}}>
          <View style = {{flex : 1}}>
            <Text style = {{fontSize : 15, color : '#000000', alignSelf : "center"}} > Départ :  </Text>
            <TextInput/>
          </View>
          <View style = {{flex : 1}}>
            <Text style = {{fontSize : 15, color : '#000000', alignSelf : "center"}} > Arrivée :  </Text>
            <TextInput/>
          </View>
          <View style = {{flex : 1}}>
            <Text style = {{fontSize : 15, color : '#000000', alignSelf : "center"}}> Horaire : </Text>
            <TextInput/>
          </View>
          <View style = {{flex : 1}}>
            <Text style = {{fontSize : 15, color : '#000000', alignSelf : "center"}} > Tarif :  €</Text>
            <TextInput/>
          </View>
          <View style = {{flex : 1}}>
            <Text style = {{fontSize : 15, color : '#000000', alignSelf : "center"}} > Nombre de places libres :  </Text>
            <TextInput/>
          </View>
        </View>
        <Button title = "Appliquer les filtres" onPress= {()=>console.log("je filtre")} color="#aadd44"/>
      </View>
  </View>
  )
};

var dataRequests = [ 
    {id : 0, start : "IMT", end : "Carefour", date : "25/06 à 9h", toPay : 0, occupiedPlaces : 2, totalPlaces : 5, comment : "Canabis pas cher au i8 !!!"},
    {id : 1, start : "Carefour", end : "IMT", date : "25/06 à 20h", toPay : 0, occupiedPlaces : 0, totalPlaces : 5, comment : "Vive QUCS !"},
    {id : 2, start : "Aéroport", end : "Carefour", date : "25/06 à 15h", toPay : 0, occupiedPlaces : 1, totalPlaces : 5, comment : "J'aime me battre :)"},
    {id : 3, start : "Gare", end : "IMT", date : "26/06 à 1h", toPay : 0, occupiedPlaces : 3, totalPlaces : 5, comment : "Je vais envoyer un message très tard dans le groupe IMT A car je ne prévois rien dans ma vie."}
];

function test(id) {
  dataRequests[id].occupiedPlaces = dataRequests[id].occupiedPlaces + 1; 
  Alert.alert(title = "Candidature enregistrée !", message = "LOREM IPSUM SA MERE");
  return true
}
export default function RequestScreen() {
  return (
    <View style = {{flex : 1, backgroundColor : "white"}}>
      <StatusBar backgroundColor="#99cc33"/>
        <ScrollView>
          <CreateRequestItem/>
          {dataRequests.map((item) =>   <RequestItem key={item.id}
                                      style = {styles.offerItemDetails} 
                                      request = {item}
                                      />)}
      </ScrollView>
    </View>
    );
};

const styles = StyleSheet.create({
  RequestItemContainer : {
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
  RequestItemDetails : {
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
  }
});