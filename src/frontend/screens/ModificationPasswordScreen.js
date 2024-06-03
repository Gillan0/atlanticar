import {View, StyleSheet, Text, Pressable, StatusBar, Alert, TextInput, Image} from "react-native";
import React, {useState} from 'react';
import url from "../misc/url.js";
import { useNavigation } from '@react-navigation/native';

/**
 * Displays screen where user can change his account's 
 * password
 * @param {Route<string>} route - Navigation route 
 * @returns {React.ReactElement}
 */
export default function ModificationPasswordScreen({route}) {
    // Get navigation
    const navigation = useNavigation();

    // Initializes variables to store the new password
    const [password, setPassword] = useState('');

    /**
     * Sends a HTTP request to server to change the user's
     * password
     * 
     * @returns {null} 
     */
    function ModificationPassword() {
        
        // Data to send to server
        const dataToSend = {
            id: route.params.id,
            password: route.params.password,
            command : "modify_password",
            parameters : [password]
          };
          
        // HTTP request options
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend) 
        };
          
        // Sends HTTP request
        fetch(url, requestOptions)
        
            // Checks if answer exploitable
            .then(response => {
                if (!response.ok) {
                    Alert.alert("PAS DE MODIFICATION")
                    throw new Error('Erreur lors de la requête.');
                }
                return response.json(); 
            })

            .then(data => {
                console.log(data)
                
                // Check if database was changed
                if (data[0].affectedRows == 1) {
                    // Pop up confirmation message
                    Alert.alert("Votre mot de passe a bien été modifié");
                    navigation.goBack()
                    navigation.replace("Account", {...route.params, password: password})
                } else {
                    // Pop up error message
                    Alert.alert("Erreur !","Votre mot de passe n'a pas été modifié");
                }
            })

            // Error failsafe
            .catch(error => {
                console.error('Erreur :', error);
            });  
    }
    return (
        <View style = {{flex : 1, backgroundColor : "white"}}>
          
          <StatusBar backgroundColor="#99cc33"/>  
          
            <View style = {styles.formContainer}>
          
                {/* App Logo */}
                <Image source={require("../assets/logo.jpg")} style = {{height : 200, width : 300, alignSelf : "center"}}/>
          
                {/* New password textinput */}
                <View>
          
                    <Text style={styles.text}>Veuillez entrer votre nouveau mot de passe :</Text>
          
                    <TextInput  style={styles.input}
                                secureTextEntry={true}
                                onChangeText={(text) => setPassword(text.trim())}/>
          
                </View>
          
                {/* Confirmation button */}
                <View style = {styles.button}>
          
                    <Pressable onPress = {()=> ModificationPassword()}>
          
                        <Text style = {styles.buttonText}> Modifier mon mot de passe </Text>
          
                    </Pressable>
          
                </View>
          
            </View>
        
        </View>
    )
}

// Stylesheet for this screen
const styles = StyleSheet.create({
    input : {
        borderWidth : 1,
        marginVertical : 10,
        borderRadius : 10,
        paddingHorizontal : 10
    },
    text : {
        maxHeight: 30,
        fontSize : 15,
        color : '#000000', 
        alignSelf : "flex-start"
    },
    buttonText : {
        color : "#ffffff",
        fontSize : 18,
        fontWeight : 'bold'
    },
    button: {
        margin : 10,
        borderRadius: 10,
        padding: 5,
        backgroundColor: "#00b8de",
        elevation : 5,
        alignSelf : "center"
    },
    formContainer : {
        backgroundColor : "#fff",
        borderWidth : 1,
        borderColor : "#cbcbcb",
        borderRadius : 10,
        margin : 10,
        shadowColor: "#000",
        elevation: 5,
        padding : 10
    }
})
