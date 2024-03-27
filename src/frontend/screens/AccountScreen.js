import {View, StyleSheet, Text, Pressable, ScrollView, StatusBar, Button, Alert, TextInput, FlatList} from "react-native";
import React, {useState} from 'react';
import RevealView from "../components/RevealView";

const OfferCreatedInfo = props => {
  return (
    <View style = {{backgroundColor:"#efefef", flex : 1, margin : 15, padding : 10, borderRadius : 10}}>
      <View style = {{padding : 10}}>
        <Text style = {{fontSize : 20, fontWeight : "bold"}}>Détail des Offres Créées</Text>
      </View>
      <View style = {{padding : 10, margin : 5, borderRadius : 10, backgroundColor : "#f5f5f5"}}>

      </View>    
    </View>
  )
}

const OfferInfo = props => {
  return (
    <View style = {{backgroundColor:"#efefef", flex : 1, margin : 15, padding : 10, borderRadius : 10}}>
      <View style = {{padding : 10}}>
        <Text style = {{fontSize : 20, fontWeight : "bold"}}>Détail des Offres</Text>
      </View>
      <View style = {{padding : 10, margin : 5, borderRadius : 10, backgroundColor : "#f5f5f5"}}>
        <Text style = {{fontSize : 15, fontWeight : "bold", paddingBottom : 5, paddingTop : 5}}> Crées :</Text>
        <Text> LOREM IPSUM </Text>
        <Text> DOLOR SIN AMET </Text>
        <Text style = {{fontSize : 15, fontWeight : "bold", paddingBottom : 5, paddingTop : 5}}> Candidatures :</Text>
        <Text> LOREM IPSUM </Text>
        <Text> DOLOR SIN AMET </Text>
      </View>    
    </View>
  )
}

const RequestInfo = props => {
  return (
    <View style = {{backgroundColor:"#efefef", flex : 1, margin : 15, padding : 10, borderRadius : 10}}>
      <View style = {{padding : 10}}>
        <Text style = {{fontSize : 20, fontWeight : "bold"}}>Détail des Requêtes</Text>
      </View>
      <View style = {{padding : 10, margin : 5, borderRadius : 10, backgroundColor : "#f5f5f5"}}>
        <Text style = {{fontSize : 15, fontWeight : "bold", paddingBottom : 5, paddingTop : 5}}> Crées :</Text>
        <Text> LOREM IPSUM </Text>
        <Text> DOLOR SIN AMET </Text>
        <Text style = {{fontSize : 15, fontWeight : "bold", paddingBottom : 5, paddingTop : 5}}> Candidatures :</Text>
        <Text> LOREM IPSUM </Text>
        <Text> DOLOR SIN AMET </Text>
      </View>        
    </View>
  )
}



const AccountInfo = props => {
  return (
    <View style = {{backgroundColor:"#efefef", flex : 1, margin : 15, padding : 10, borderRadius : 10}}>
      <View style = {{padding : 10}}>
        <Text style = {{fontSize : 20, fontWeight : "bold"}}>Bonjour, {props.info.name} !</Text>
      </View>
      <View style = {{padding : 10, margin : 5, borderRadius : 10, backgroundColor : "#f5f5f5"}}>
        <Text>Offres : {props.info.nbOffer}</Text>
        <Text>Requêtes émises : {props.info.nbRequest}</Text>
      </View>    
    </View>
  )
}

export default function ConnectionScreen() {
    return (
      <View style = {{flex : 1, backgroundColor : "white"}}>
        <StatusBar backgroundColor="#99cc33"/>
        <ScrollView>
          <AccountInfo info = {{name : "Gillano", nbOffer : 2, nbRequest : 0}}/>
          <OfferInfo info = {{name : "Gillano", nbOffer : 2, nbRequest : 0}}/>          
          <RequestInfo info = {{name : "Gillano", nbOffer : 2, nbRequest : 0}}/>
        </ScrollView>
      </View>
    )

}