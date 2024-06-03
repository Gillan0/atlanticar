import {View, StyleSheet, Text, Pressable, StatusBar, Alert, TextInput, Image, ScrollView} from "react-native";
import React, {useState, useRef} from 'react';
import url from "../misc/url.js";
import { useNavigation } from '@react-navigation/native';


/**
 * Displays the screen where a user can reset 
 * his password because he forgot it
 * 
 * @returns {React.ReactElement}
 */
export default function ForgotPasswordScreen() {
    // Get navigation
    const navigation = useNavigation();

    // Initializes variables to store values of textinput
    const [prompts, setPrompts] = useState(['','']);

    // References the Scrollview
    const scrollContainer = useRef();

    /**
     * Changes value of associated variable 
     * once textinput is updated
     * 
     * @param {string} text - New text
     * @param {number} index - Index in 'inputs' variable associated to said textinput  
     */
    function changePrompts(text,index) {
        const newPrompts = [...prompts];
        newPrompts[index] = text.trim(); 
        setPrompts(newPrompts);
    }

    /**
     * Sends a HTTP request to the server and changes rendered 
     * announcements based on answer
     */
    function ForgotPassword() {
        
        // Data to send to server
        const dataToSend = {
            user: prompts[0],
            email: prompts[1],
            command : "forgotten_password",
            parameters : [prompts[0], prompts[1]]
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
                    throw new Error('Erreur lors de la requête.');
                }
                return response.json();
            })

            .then(data => {
                console.log(data)

                // If database was changed
                if (data[0].affectedRows == 1) {

                    // Pop up confirmation message
                    Alert.alert("Mot de passe modifié !", "Un mail sur votre addresse IMT vous a été envoyé avec un nouveau mot de passe");
                    
                    // Go back to Login screen
                    navigation.goBack()
                } else {

                    // Pop up error message
                    Alert.alert("Désolé !", "Nous n'avons pas réussi à modifier votre mot de passe")

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
          
          <ScrollView ref = {scrollContainer}>
          
                <View style = {styles.formContainer}>

                    {/* Logo */}
                    <Image source={require("../assets/logo.jpg")} style = {{height : 200, width : 300, alignSelf : "center"}}/>
          
                    {/* Username textinput */}
                    <View>
          
                        <Text style={styles.text}>Veuillez entrer votre nom d'utilisateur:</Text>
          
                        <TextInput  style={styles.input}
                                onChangeText={(text) => changePrompts(text, 0)}
                                onPress={() => 
                                {
                                    if (scrollContainer.current) {
                                        scrollContainer.current.scrollTo({y : 100, animated: true})
                                    }
                                }
                                }   
                                />
                    </View>
                
                    {/* Email textinput */}
                    <View>
                
                        <Text style={styles.text}>Veuillez entrer votre addresse mail IMT:</Text>
                
                        <TextInput  style={styles.input}
                                onChangeText={(text) => changePrompts(text, 1)}
                                onPress={() => 
                                {
                                    if (scrollContainer.current) {
                                        scrollContainer.current.scrollTo({y : 150, animated: true})
                                    }
                                }
                                }  />
                
                    </View>
                
                    {/* Confirm button */}
                    <View style = {styles.button}>
                
                      <Pressable onPress = {()=> ForgotPassword()}>
                
                            <Text style = {styles.buttonText}>Réinitialiser mon mot de passe</Text>
                
                        </Pressable>
                
                    </View>
           
                </View>
            
                {/* White void to allow scroll */}
                <View style = {{flex: 1, height : 100}}/>
            
            </ScrollView> 
        
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

