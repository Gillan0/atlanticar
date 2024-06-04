import {View, StyleSheet, Text, Pressable, StatusBar, Alert, TextInput, Image, ScrollView} from "react-native";
import React, {useState, useRef} from 'react';
import url from "../misc/url.js";
import { useNavigation } from '@react-navigation/native';
import isIMTAdress from '../checkFunctions/isIMTAdress.js'
import isOnlyNumbers from '../checkFunctions/isOnlyNumbers.js'
import SHA256 from 'crypto-js/sha256';

/**
 * Displays the screen where you can to sign up
 * 
 * @returns {React.ReactElement}
 */
export default function SignUpScreen(){
    // Get navigation to allow navigation between screens
    const navigation = useNavigation();
    
    // Initialize variables for the prompts necessary to sign up
    const [prompts, setPrompts] = useState(['','', '']);
    
    // Allows to reference a ReactElement's parameters and change it
    const scrollContainer = useRef();

    /**
     * Changes a prompts' assigned variable. Called when the value of a Textinput is changed
     * 
     * @param {string} text - text of the changed prompt 
     * @param {number} index -  index of the changed prompt in the prompts variable
     */
    function changePrompts(text,index) {
        const newPrompts = [...prompts];
        newPrompts[index] = text.trim();
        newPrompts[index] = text.trim(); 
        setPrompts(newPrompts);
    }

    /**
     * Sends a server request to sign up a new user to the database
     * 
     * @returns {null} 
     */
    function SignUp() {
        // Check for textual constraints in the different prompts

        if (prompts[0].length > 15 || prompts[1].length > 15) {
            Alert.alert('Erreur !', 'Le nom d\'utilisateur et/ou le mot de passe ne peut pas dépasser 15 caractères.');
            return;
        }
        if (prompts[2].length !== 10 && prompts[1].length !== 0) {
            Alert.alert('Erreur !', 'Le numéro de téléphone ne peut pas dépasser 10 caractères.');
            return;
        }
        if (!prompts[0] || !prompts[1] || !prompts[2] || !prompts[3]) {
            Alert.alert('Erreur !', 'Veuillez remplir tous les champs.');
            return;
        }
        if (!isOnlyNumbers(prompts[2])) {
            Alert.alert('Erreur !', 'Le numéro de téléphone doit contenir uniquement des chiffres.');
            return;
        }
        if(!isIMTAdress(prompts[3])){
            Alert.alert('Erreur !', 'L\'adresse mail doit être une adresse mail IMT.');
            return;
        }

        // Define data to send to the server
        const dataToSend = {
            id: prompts[0],
            password: prompts[1],//.replace(/ /g, ''),
            phone_number : prompts[2].match(/.{1,2}/g).join(' '),
            email: prompts[3],
            command : "signUp",
            parameters : [prompts[0], SHA256(prompts[1]).toString(), prompts[2].match(/.{1,2}/g).join(' '), prompts[3]]
        };

        // Options of the http request
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend) // Convert data to JSON format
          };
        
        // Send http request
        fetch(url, requestOptions)
        // Check if obtained response is correct
        .then(response => {
            if (!response.ok) {
                Alert.alert("COMPTE NON CRÉE")
                throw new Error('Erreur lors de la requête.');
            }
            // Returns the JSON data of the response
            return response.json();
        })
        // Exploit useable data
        .then(data => {
            // Changes screen if database modified
            if (data[0].affectedRows == 1) {
                Alert.alert('Votre compte est bien crée !', 'Bienvenue sur Atlanticar !');
                navigation.replace("Main", {id : data[0].insertId, username : prompts[0], password : prompts[1], phone_number : prompts[2].match(/.{1,2}/g).join(' '), email: prompts[3]})
            } else {
                // Shows error message to user
                Alert.alert('Erreur ! Le nom d\'utilisateur ou le numéro de téléphone existe déjà.');
            }
        })
        
        // Error failsafe
        .catch(error => {
            console.error('Erreur :', error);
        });  
    }
    
    return (
        
        <View style = {{flex : 1, backgroundColor : "white"}}>
            {}
            <StatusBar backgroundColor="#99cc33"/>  
            <ScrollView ref = {scrollContainer}>
                <View style = {styles.formContainer}>
                    {/* App logo */}
                    <Image source={require("../assets/logo.jpg")} style = {{height : 200, width : 300, alignSelf : "center"}}/>
                    
                    {/* Username prompt */}
                    <View>
                            <Text style={styles.text}>Nom d'utilisateur</Text>
                            <TextInput  style={styles.input}
                                    onChangeText={(text) => changePrompts(text, 0)}
                                    onPress={() => scrollContainer.current.scrollTo({y : 75,  animated : true})}
                                    />
                    </View>

                    {/* Password prompt */}
                    <View>
                        <Text style={styles.text}>Mot de passe</Text>
                        <TextInput  style={styles.input}
                                    secureTextEntry={true}
                                    onChangeText={(text) => changePrompts(text, 1)}
                                    onPress={() => scrollContainer.current.scrollTo({y : 125,  animated : true})}
                                    />
                    </View>

                    {/* Phone number prompt */}
                    <View>
                        <Text style={styles.text}>Numéro de téléphone</Text>
                        <TextInput  value = {prompts[2] ? prompts[2].match(/.{1,2}/g).join(' ') : ''}
                                    style={styles.input}
                                    onChangeText={(text) => changePrompts(text.replace(/\s/g, ''), 2)}
                                    onPress={() => scrollContainer.current.scrollTo({y : 200,  animated : true})}
                                    />
                    </View>

                    {/* Email address prompt */}
                    <View style={{flex: 1}}>
                        <Text style={styles.text}>Adresse mail IMT</Text>
                        <TextInput  style={styles.input}
                                    onChangeText={(text) => changePrompts(text, 3)}
                                    onPress={() => scrollContainer.current.scrollTo({y : 300,  animated : true})}
                                    />
                    </View>

                    {/* Create Account Button */}
                    <View style = {styles.button}>
                        <Pressable onPress = {()=> SignUp()}>
                            <Text style = {styles.buttonText}> Créer mon compte </Text>
                        </Pressable>
                    </View>

                </View>

                {/* White space to allow scrolling when keyboard shows up*/}
                <View style = {{flex: 1, height : 300}}/>
            </ScrollView>
        </View>
    )
}

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