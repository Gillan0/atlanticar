import {View, StyleSheet, Text, Pressable, StatusBar, Alert, TextInput, Image, ScrollView} from "react-native";
import React, {useState, useRef} from 'react';
import url from "../misc/url.js";
import { useNavigation } from '@react-navigation/native';
import isIMTAdress from "../checkFunctions/isIMTAdress.js";
import SHA256 from 'crypto-js/sha256';

/**
 * Displays the Login Screen
 * 
 * @returns {React.ReactElement}
 */
export default function LoginScreen() {

    // Get navigation
    const navigation = useNavigation();

    // Initializes variables to store values of TextInput
    const [prompts, setPrompts] = useState(['','']);
    
    // References ScrollView
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
     * Processes data from textinput then sends the HTTP request
     * Switches to Main Offer screen if request successful
     */
    function signIn() {

        // Checks for empty textinput
        if (prompts[0] == "") {
            Alert.alert("Désolé !", "Merci de renseigner votre addresse mail IMT Atlantique")
            return;
        }
        if (prompts[1] == "") {
            Alert.alert("Désolé !", "Merci de renseigner un mot de passe")
            return;
        }
        // Checks if the email is a valid IMT Adress
        if(!isIMTAdress(prompts[0])){
            Alert.alert('Erreur !', 'L\'adresse mail doit être une adresse mail IMT.');
            return;
        }
        // Data to send to server
        const dataToSend = {
            id: null,
            password: null,
            command : "signIn",
            parameters : [prompts[0], SHA256(prompts[1]).toString()]
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
                    Alert.alert("PAS CONNECTÉ")
                    throw new Error('Erreur lors de la requête.');
                }
                return response.json(); // Renvoie les données JSON de la réponse
            })

            .then(data => {
                console.log(data)
                if (data[0][0]) {
                    // If login successful, switch to Main Offers Screen
                    if (data[0][0].answer == "TRUE") {
                        navigation.replace("Main", {id : data[0][0].id, username : data[1][0].user, password : prompts[1], phone_number : data[1][0].phone_number, email: prompts[0]})
                        return;
                    } 
                }
                Alert.alert("Désolé !", "Nom d'utilisateur ou mot de passe incorrect");
            })

            // Error failsafe
            .catch(error => {
                Alert.alert("Désolé !", "Erreur de connexion !")
                console.error('Erreur :', error);
            });  
    }
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            
            <StatusBar backgroundColor="#99cc33" />
            
            <ScrollView contentContainerStyle={styles.container} ref={scrollContainer}>
            
                <View style={styles.formContainer}>

                    {/* Logo */}
                    <Image source={require("../assets/logo.jpg")} style={styles.logo} />
            
                    {/* Email address textinput */}
                    <View>
            
                        <Text style={styles.text}>Addresse mail IMT</Text>
            
                        <TextInput style={styles.input}
                            onChangeText={(text) => changePrompts(text, 0)}
                            onPress={() => 
                            {
                                if (scrollContainer.current) {
                                    scrollContainer.current.scrollTo({y : 45, animated: true})
                                }
                            }
                            } 
                            />
                    </View>
                    
                    {/* Password textinput */}
                    <View>
                    
                        <Text style={styles.text}>Mot de passe</Text>
                    
                        <TextInput style={styles.input}
                            secureTextEntry={true}
                            onChangeText={(text) => changePrompts(text, 1)}
                            onPress={() => 
                            {
                                if (scrollContainer.current) {
                                    scrollContainer.current.scrollTo({y : 50, animated: true})
                                }
                            }
                            } 
                            />
                    </View>
                    
                    {/* Confirm button */}
                    <View style={styles.button}>
                    
                        <Pressable onPress={() => signIn()}>
                    
                            <Text style={styles.buttonText}> Se connecter </Text>
                    
                        </Pressable>
                    
                    </View>
                    
                    <View style={styles.linksContainer}>
                    
                        {/* Button to switch to Sign Up Screen */}
                        <Pressable onPress={() => navigation.navigate('SignUp')}>
                    
                            <Text style={[styles.linkText, { color: "#00b8de" }]}>Créer un compte</Text>
                    
                        </Pressable>

                        {/* Button to switch to Forgotten Password Screen */}
                        <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
                    
                            <Text style={[styles.linkText, { color: "#00b8de" }]}>Mot de passe oublié ?</Text>
                    
                        </Pressable>
                    
                    </View>
                
                </View>
            
            </ScrollView>
        
        </View>
    )
}

// Stylesheet for this screen
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    logo: {
        height : 200,
        width : 300,
        alignSelf : "center"
    },
    text : {
        fontSize : 15,
        color : '#000000', 
        alignSelf : "flex-start"
    },
    input : {
        borderWidth : 1,
        marginVertical : 10,
        borderRadius : 10,
        paddingHorizontal : 10
    },
    button: {
        margin : 10,
        borderRadius: 10,
        padding: 5,
        backgroundColor: "#00b8de",
        elevation : 5,
        alignSelf : "center"
    },
    buttonText : {
        color : "#ffffff",
        fontSize : 18,
        fontWeight : 'bold'
    },
    linksContainer: {
        alignItems : "center",
        marginTop: 20
    },
    linkText: {
        color : "#656565",
        textDecorationLine : "underline",
        marginVertical: 5
    }
});

