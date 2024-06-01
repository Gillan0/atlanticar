import {View, Image, StyleSheet, Text, Pressable, StatusBar, Alert, ScrollView} from "react-native";
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import AccountInfo from "../components/AccountInfo";
import AnnouncementsInfo from "../components/AnnouncementsInfo";
import ApplicationsInfo from "../components/ApplicationsInfo";


const OtherInfo = () => {
  const navigation = useNavigation();
  const handleLogOut = () => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }], // Définition de la nouvelle pile d'écrans
    })
    Alert.alert('Vous êtes déconnecté')
  }
  return (
    <View style = {{...styles.welcomeContainer, padding : 10 ,flex : 1, borderRadius : 10, flexDirection: "row"}}>
      <View>
          <View style = {{alignSelf : "center", top : 4, borderWidth: 5, borderColor: 'white', borderRadius : 10, width : 20, height : 20}}/>
      </View>
      <View style = {{flex : 1}}>
        <View style = {{paddingLeft : 10}}>
          <Text style = {{fontSize : 20, fontWeight : 'bold', color : "#fff"}}> Autres </Text>
        </View>
        <View style = {{flex : 1, padding : 10}}>    
          <Pressable onPress = {() => navigation.navigate("Notifications")} style = {styles.buttonContainer}>  
            <View style = {{flexDirection : "row"}}>
              <Image source = {require("../assets/bell.png")} style = {{height : 22, width : 22, marginRight : 10}} />
              <Text style = {styles.buttonText}>Notifications</Text>
            </View>
          </Pressable>
          <Pressable onPress = {handleLogOut} style = {styles.buttonContainer}>  
            <View style = {{flexDirection : "row"}}>
              <Image source = {require("../assets/logo_deconnexion.png")} style = {{height : 22, width : 22, marginRight : 10}} />
              <Text style = {styles.buttonText}>Déconnexion</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
    
  )
}

export default function AccountScreen({route}) {
    return (
      <View>
        <StatusBar backgroundColor="#99cc33"/>
        <ScrollView style = {{backgroundColor : "#fff"}}>
          <AccountInfo/>
          <AnnouncementsInfo/>
          <ApplicationsInfo/>
          <OtherInfo/>
        </ScrollView>
      </View>
    )

}

const styles = StyleSheet.create({
  welcomeContainer : {
    margin : 10,
    padding : 5,
    borderRadius : 10,
    backgroundColor : "#00b8de",
    flex : 1,
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