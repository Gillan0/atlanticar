import {View, Image, StyleSheet, Text, Pressable, StatusBar, Alert, ScrollView} from "react-native";
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


const AccountInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [showPassword, setShowPassword] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const password = route.params ? route.params.password : '****';
  const phone_number = route.params ? route.params.phone_number : '****';


  return (
    <View style = {{...styles.welcomeContainer, padding : 10 ,flex : 1, flexDirection : "row"}}>
      <View>
        <View style = {{alignSelf : "center", top : 4, borderWidth: 5, borderColor: 'white', borderRadius : 10, width : 20, height : 20}}/>
      </View>
      <View style = {{flex : 1}}>
        <Image source = {require("../assets/blue_info.png")} style={{height: 200, width : 200, right: 0, bottom : 10, position : "absolute"}}/>
        <View style = {{paddingHorizontal : 10}}>
          <Text style = {{fontSize : 20, fontWeight : 'bold', color : "#fff"}}> Informations personnelles </Text>
        </View> 
        <View style = {{padding : 8}}>
         <View style = {{justifyContent : "flex-start", paddingTop : 15}}>
            <Text style = {{fontSize : 15, fontWeight : 'bold', color : "#fff"}}> Nom d'utilisateur : </Text>
              <View style = {{flex : 0.65, justifyContent : "center", paddingTop : 5}}>
                    <Text style = {{color : "#fff"}}> {route.params.username}</Text>
              </View>
          </View>
          <View style = {{justifyContent : "flex-start", paddingVertical: 15}}>
            <Text style = {{fontSize : 15, fontWeight : 'bold', color : "#fff"}}>Mot de passe : </Text>
            <View style = {{flex : 1, flexDirection : "row"}}>
               <View style = {{flex : 0.65, justifyContent : "center"}}>
                    <Text style = {{color : "#fff"}}> { showPassword ? route.params.password : "• ".repeat(route.params.password.length)}</Text>
                </View>
              <View style = {{flexDirection : "row", flex : 0.35, justifyContent : "space-around"}}>
                <Pressable style = {{borderRadius : 5, borderWidth : 1, borderColor : "#fff"}} onPress={() => setShowPassword(!showPassword)}>
                      <Image source = { showPassword ? require("../assets/white_eye_closed.png") : require("../assets/white_eye.png")} style = {{height : 25, width : 25}}/>
                </Pressable>
                <Pressable style = {{borderRadius : 5, borderWidth : 1, borderColor : "#444"}} onPress={() => navigation.navigate("ModificationPassword")}>
                      <Image source = {require("../assets/parameters.png")} style = {{height : 25, width : 25}}/>
                </Pressable>
              </View>
            </View>
          </View>
          <View style = {{justifyContent : "flex-start", paddingBottom: 15}}>
            <Text style = {{fontSize : 15, fontWeight : 'bold', color : "#fff"}}>Numéro de téléphone : </Text>
            <View style = {{flex : 1, flexDirection : "row", justifyContent : "space-between"}}>
              <View style = {{flex : 0.65, justifyContent : "center"}}>
                  <Text style = {{color : "#fff"}}> {showPhone ? route.params.phone_number :"• •  ".repeat(5)}</Text>
              </View>
              <View style = {{flexDirection : "row", flex : 0.35, justifyContent : "space-around"}}>
                <Pressable style = {{borderRadius : 5, borderWidth : 1, borderColor : "#fff"}} onPress={() => setShowPhone(! showPhone)}>
                      <Image source = { showPhone ? require("../assets/white_eye_closed.png") : require("../assets/white_eye.png")} style = {{height : 25, width : 25}}/>
                </Pressable>
                <Pressable style = {{borderRadius : 5, borderWidth : 1, borderColor : "#444"}} onPress={() => navigation.navigate("ModificationPhoneNumber")}>
                      <Image source = {require("../assets/parameters.png")} style = {{height : 25, width : 25}}/>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const AnnouncementsInfo = () => {
  const navigation = useNavigation();
  return (
    <View style = {{...styles.welcomeContainer, padding : 10 ,flex : 1, borderRadius : 10, flexDirection: "row"}}>
      <View>
          <View style = {{alignSelf : "center", top : 4, borderWidth: 5, borderColor: 'white', borderRadius : 10, width : 20, height : 20}}/>
      </View>
      <View style = {{flex : 1}}>
        <View style = {{paddingLeft : 10}}>
          <Text style = {{fontSize : 20, fontWeight : 'bold', color : "#fff"}}> Vos Annonces Créées </Text>
        </View>
        <View style = {{flex : 1, padding : 10}}>
          <Pressable onPress = {() => navigati1on.navigate("AnnouncementsOffers")} style = {styles.buttonContainer}>  
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
      </View>
    </View>
  )
}

const ApplicationsInfo = () => {
  
  const navigation = useNavigation();
  return (
    <View style = {{...styles.welcomeContainer, padding : 10 ,flex : 1, borderRadius : 10, flexDirection: "row"}}>
      <View>
          <View style = {{alignSelf : "center", top : 4, borderWidth: 5, borderColor: 'white', borderRadius : 10, width : 20, height : 20}}/>
      </View>
      <View style = {{flex : 1}}>
        <View style = {{paddingLeft : 10}}>
          <Text style = {{fontSize : 20, fontWeight : 'bold', color : "#fff"}}> Vos Candidatures </Text>
        </View>
        <View style = {{flex : 1, padding : 10}}>
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
    </View>
  )
}

const OtherInfo = () => {
  const navigation = useNavigation();
  const handleLogOut = () => {
    navigation.replace('Login');
    Alert.alert('Vous êtes déconnecté')
  }
  return (
    <View style = {{...styles.welcomeContainer, padding : 10 ,flex : 1, borderRadius : 10, flexDirection: "row"}}>
      <View>
          <View style = {{alignSelf : "center", top : 4, borderWidth: 5, borderColor: 'white', borderRadius : 10, width : 20, height : 20}}/>
      </View>
      <View style = {{flex : 1}}>
        <View style = {{paddingLeft : 10}}>
          <Text style = {{fontSize : 20, fontWeight : 'bold', color : "#fff"}}>  </Text>
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
        <ScrollView>
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