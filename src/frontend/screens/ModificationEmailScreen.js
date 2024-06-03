import {View, StyleSheet, Text, Pressable, StatusBar, Alert, TextInput, Image} from "react-native";
import React, {useState} from 'react';
import url from "../misc/url.js";
import { useNavigation } from '@react-navigation/native';

/**
 * Displays screen where user can change his account's 
 * email address
 * @param {Route<string>} route - Navigation route 
 * @returns {React.ReactElement}
 */
export default function ModificationEmailScreen({route}) {
    // Get navigation
    const navigation = useNavigation();
    
    // Initializes variables to store the new email address
    const [email, setEmail] = useState('');

    /**
     * Sends a HTTP request to server to change the user's
     * email address
     * 
     * @returns {null} 
     */
    function ModificationEmail() {

        // Data to send to server
        const dataToSend = {
            id: route.params.id,
            password: route.params.password,
            command : "modify_email",
            parameters : [email.replace(/\s/g, '')]
          };
          
        // HTTP request options
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend) // Convert data to JSON format
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
                    Alert.alert("Votre addresse mail a bien été modifié");
                    navigation.goBack()
                    navigation.replace("Account", {...route.params, email: email})
                } else {
                    // Pop up error message
                    Alert.alert("Erreur !","Votre addresse mail n'a pas été modifié");
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

                {/* App logo */}          
                <Image source={require("../assets/logo.jpg")} style = {{height : 200, width : 300, alignSelf : "center"}}/>
          
                {/* New email textinput */}
                <View>
          
                    <Text style={styles.text}>Veuillez entrer votre nouvelle addresse mail:</Text>
          
                    <TextInput  style={styles.input}
                                onChangeText={(text) => setEmail(text.trim())}/>
          
                </View>
          
                {/* Confirmation button */}
                <View style = {styles.button}>
          
                    <Pressable onPress = {()=> ModificationEmail()}>
          
                        <Text style = {styles.buttonText}> Modifier mon email </Text>
          
                    </Pressable>
          
                </View>
          
            </View>
        
        </View>
    )
}

// Stylesheet for this screen
const styles = StyleSheet.create({
    destinations : {
        backgroundColor : "#aaaaaa"
    },
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