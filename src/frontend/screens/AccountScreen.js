import {View, StyleSheet, Text, Pressable, StatusBar, Alert} from "react-native";
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
            <Pressable onPress = {() => navigation.navigate("Announcements")} style = {styles.buttonContainer}>  
                <Text style = {styles.buttonText}>Voir vos Annonces</Text>
            </Pressable>
            <Pressable onPress = {() => navigation.navigate("Applications")} style = {styles.buttonContainer}>  
                <Text style = {styles.buttonText}>Voir vos Candidatures</Text>
            </Pressable>
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
    color: 'black', // Couleur du texte
  },
  buttonContainer : {
    backgroundColor:"#efefef",
    alignItems : "center", 
    margin : 15, 
    padding : 10, 
    borderRadius : 10
  }
})