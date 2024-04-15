import {View, StyleSheet, Text, Pressable, ScrollView, StatusBar, Button, Alert, TextInput, FlatList} from "react-native";
import React, {useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';

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


const ApplicationsInfo = props => {
  return (
    <View>

    </View>
  )
}


export default function ConnectionScreen({route}) {


    return (
      <View style = {{flex : 1, backgroundColor : "white"}}>
        <StatusBar backgroundColor="#99cc33"/>
        <ScrollView>
          <AccountInfo info = {{name : route.params.username, nbOffer : 2, nbRequest : 0}}/>
          <OfferInfo info = {{name : "Gillano", nbOffer : 2, nbRequest : 0}}/>          
          <RequestInfo info = {{name : "Gillano", nbOffer : 2, nbRequest : 0}}/>
        </ScrollView>
      </View>
    )

}