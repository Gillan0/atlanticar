import {View, Image, StyleSheet, Text, Pressable} from "react-native";
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

/**
 * Widget which shows the personal info of an account : 
 *  - username
 *  - password
 *  - phone number
 *  - email
 * Parameters button lead to a screen which changes the personal info
 */
const AccountInfo = () => {
  // Get navigation pile to allow navigation between screens
  const navigation = useNavigation();

  // Get info from route which contains all personal info
  const route = useRoute();

  // Variables to change the shown status of sensitive informations
  const [showPassword, setShowPassword] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  return (
    <View style = {styles.mainContainer}>
      
      <View style = {{flex : 0.05}}>
        <View style = {styles.bulletPoint}/>
      </View>
      
      <View style = {{flex : 0.95}}>
        
        <Image source = {require("../assets/blue_info.png")} style={styles.logo}/>
        
        <View style = {{paddingHorizontal : 10}}>
          <Text style = {styles.titleText}> Informations personnelles </Text>
        </View> 
        
        <View style = {{padding : 8}}>
          
          
          <View style = {{justifyContent : "flex-start", paddingTop : 15}}>
            <Text style = {styles.subtitleText}> Nom d'utilisateur : </Text>
              <View style = {styles.usernameContainer}>
                <Text style = {styles.baseText}> {route.params.username}</Text>
              </View>
          </View>
          
          
          <View style = {{justifyContent : "flex-start", paddingVertical: 15}}>
            <Text style = {styles.subtitleText}>Mot de passe : </Text>
            
            <View style = {{flex : 1, flexDirection : "row"}}>
              
              <View style = {{flex : 0.65, justifyContent : "center"}}>
                    <Text style = {styles.baseText}> { showPassword ? route.params.password : "• ".repeat(route.params.password.length)}</Text>
              </View>
              
              <View style = {styles.imageContainer}>
                <Pressable style = {{borderRadius : 5, borderWidth : 1, borderColor : "#fff"}} onPress={() => setShowPassword(!showPassword)}>
                      <Image source = { showPassword ? require("../assets/white_eye_closed.png") : require("../assets/white_eye.png")} style = {{height : 25, width : 25}}/>
                </Pressable>
                <Pressable style = {{borderRadius : 5, borderWidth : 1, borderColor : "#fff"}} onPress={() => navigation.navigate("ModificationPassword")}>
                      <Image source = {require("../assets/white_parameters.png")} style = {{height : 25, width : 25}}/>
                </Pressable>
              </View>
            
            </View>

          </View>
          
          
          <View style = {{justifyContent : "flex-start", paddingBottom: 15}}>
            <Text style = {styles.subtitleText}>Numéro de téléphone : </Text>
            <View style = {{flex : 1, flexDirection : "row", justifyContent : "space-between"}}>
              <View style = {{flex : 0.65, justifyContent : "center"}}>
                  <Text style = {styles.baseText}> {showPhone ? route.params.phone_number :"• •  ".repeat(5)}</Text>
              </View>
              <View style = {styles.imageContainer}>
                <Pressable style = {{borderRadius : 5, borderWidth : 1, borderColor : "#fff"}} onPress={() => setShowPhone(! showPhone)}>
                      <Image source = { showPhone ? require("../assets/white_eye_closed.png") : require("../assets/white_eye.png")} style = {{height : 25, width : 25}}/>
                </Pressable>
                <Pressable style = {{borderRadius : 5, borderWidth : 1, borderColor : "#fff"}} onPress={() => navigation.navigate("ModificationPhoneNumber")}>
                      <Image source = {require("../assets/white_parameters.png")} style = {{height : 25, width : 25}}/>
                </Pressable>
              </View>
            </View>
          </View>

          
          <View style = {{justifyContent : "flex-start", paddingBottom: 15}}>
          
          <View style = {{flex : 1, flexDirection : "row", justifyContent : "space-between"}}>
            <Text style = {styles.subtitleText}>Email : </Text>
            <View style = {{...styles.imageContainer, flex : 0.49}}>
                <Pressable style = {{borderRadius : 5, borderWidth : 1, borderColor : "#fff"}} onPress={() => setShowEmail(! showEmail)}>
                      <Image source = { showEmail ? require("../assets/white_eye_closed.png") : require("../assets/white_eye.png")} style = {{height : 25, width : 25}}/>
                </Pressable>
                <Pressable style = {{borderRadius : 5, borderWidth : 1, borderColor : "#fff"}} onPress={() => navigation.navigate("ModificationEmail")}>
                      <Image source = {require("../assets/white_parameters.png")} style = {{height : 25, width : 25}}/>
                </Pressable>
              </View>
            </View>
              <View style = {{flex : 0.65, justifyContent : "center"}}>
                  <Text style = {styles.baseText}> {showEmail ? route.params.email :"• ".repeat(route.params.email.length)}</Text>
              </View>
          </View>
        
        
        </View>
      </View>
    </View>
  )
}

/**
 * Stylesheet for the AccountInfo widget
 */
const styles = StyleSheet.create({
  logo : {
    height: 200, 
    width : 200, 
    right: 0, 
    bottom : 30, 
    position : "absolute"
  },
  mainContainer : {
    margin : 10,
    padding : 5,
    borderRadius : 10,
    backgroundColor : "#00b8de",
    flex : 1, 
    padding : 10 ,
 
    flexDirection : "row"
  },
  bulletPoint : {
    alignSelf : "center", 
    top : 4, 
    borderWidth: 5, 
    borderColor: 'white', 
    borderRadius : 10, 
    width : 20, 
    height : 20,
  },
  titleText : {
    fontSize : 20, 
    fontWeight : 'bold', 
    color : "#fff"
  },
  baseText : {
    color : "#fff"
  },
  subtitleText : {
    fontSize : 15, 
    fontWeight : 'bold', 
    color : "#fff"
  },
  usernameContainer : {
    flex : 0.65, 
    justifyContent : "center", 
    paddingTop : 5
  },
  imageContainer : {
    flexDirection : "row", 
    flex : 0.45, 
    justifyContent : "space-around"
  }
})

export default AccountInfo;