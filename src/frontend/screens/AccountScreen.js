import {View, Image, StyleSheet, Text, Pressable, StatusBar, Alert} from "react-native";
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';

const AccountInfo = props => {
  return (
    <View style = {{backgroundColor:"#efefef", margin : 15, padding : 5, borderRadius : 10}}>
        <View style = {{alignItems : "center", padding : 5}}>
          <Text style = {{fontSize : 15, fontWeight : 'bold'}}> Informations personnelles </Text>
        </View>
        <View style = {{padding : 8}}>
          <View style = {{flexDirection : "row", justifyContent : "space-between"}}>
            <Text>Nom d'utilisateur : </Text>
            <Text>**</Text>
          </View>
          <View style = {{flexDirection : "row", justifyContent : "space-between"}}>
            <Text>Adresse mail : </Text>
            <Text>***********************</Text>
          </View>
          <View style = {{flexDirection : "row", justifyContent : "space-between"}}>
            <Text>Mot de passe : </Text>
            <Text>****</Text>
          </View>
        </View>
    </View>
  )
}

export default function AccountScreen({route}) {
    const navigation = useNavigation();

    return (
      <View style = {{flex : 1, backgroundColor : "white"}}>
        <StatusBar backgroundColor="#99cc33"/>
          <View style = {styles.welcomeContainer}>
            <Text style = {styles.welcomeText}> Bienvenue, {route.params.username} ! </Text>
          </View>
          <AccountInfo/> 
          <View style = {{backgroundColor:"#efefef", margin : 15, padding : 5, borderRadius : 10}}>
            <View style = {{alignItems : "center", padding : 5}}>
              <Text style = {{fontSize : 15, fontWeight : 'bold'}}> Annonces Créées </Text>
            </View>
            <Pressable onPress = {() => navigation.navigate("AnnouncementsOffers")} style = {styles.buttonContainer}>  
              <View style = {{flexDirection : "row"}}>
                <Image source = {require("../assets/black_offer.png")} style = {{height : 22, width : 22, marginRight : 10}} />
                <Text style = {styles.buttonText}>Offres</Text>
              </View>
            </Pressable>
            <Pressable onPress = {() => navigation.navigate("AnnouncementsRequests")} style = {styles.buttonContainer}>  
            <View style = {{flexDirection : "row"}}>
                <Image source = {require("../assets/black_request.png")} style = {{height : 22, width : 22, marginRight : 10}} />
                <Text style = {styles.buttonText}>Requêtes</Text>
            </View>
            </Pressable>
          </View>
          <View style = {{backgroundColor:"#efefef", margin : 15, padding : 5, borderRadius : 10}}>
            <View style = {{alignItems : "center", padding : 5}}>
              <Text style = {{fontSize : 15, fontWeight : 'bold'}}> Vos Candidatures </Text>
            </View>
            <Pressable onPress = {() => navigation.navigate("ApplicationsOffers")} style = {styles.buttonContainer}>  
              <View style = {{flexDirection : "row"}}>
                <Image source = {require("../assets/black_offer.png")} style = {{height : 22, width : 22, marginRight : 10}} />
                <Text style = {styles.buttonText}>Aux Offres</Text>
              </View>
            </Pressable>
            <Pressable onPress = {() => navigation.navigate("ApplicationsRequests")} style = {styles.buttonContainer}>  
              <View style = {{flexDirection : "row"}}>
                <Image source = {require("../assets/black_request.png")} style = {{height : 22, width : 22, marginRight : 10}} />
                <Text style = {styles.buttonText}>Aux Requêtes</Text>
              </View>
            </Pressable>
          </View>
      </View>
    )

}

const styles = StyleSheet.create({
  welcomeContainer : {
    margin : 5,
    padding : 10,
    borderRadius : 10,
    alignItems : "center",
    elevation : 5,
    backgroundColor : "#00c9ef"
  },
  welcomeText : {
    fontSize : 25,
    fontWeight : "bold",
    color : "#fff"
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer : {
    backgroundColor:"#fff",
    alignItems : "center", 
    margin : 5, 
    padding : 8, 
    borderRadius : 10,
  }
})