import {View, StyleSheet, Text, Pressable, StatusBar, Alert, TextInput, Image, ScrollView} from "react-native";
import React, {useState, useRef} from 'react';
import url from "../components/url.js";
import { useNavigation } from '@react-navigation/native';

export default function ForgotPasswordScreen({route}){
    
    const navigation = useNavigation();
    const [prompts, setPrompts] = useState(['','']);

    const scrollContainer = useRef();

    function changePrompts(text,index) {
        const newPrompts = [...prompts];
        newPrompts[index] = text.trim(); 
        setPrompts(newPrompts);
    }


    function ForgotPassword() {

        const dataToSend = {
            user: prompts[0],
            email: prompts[1],
            command : "mot_de_passe_oublie",
            parameters : [prompts[0], prompts[1]]
          };
          
          // Options de la requête
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend) // Convertir les données en format JSON
          };
          
          // Envoi de la requête avec fetch
          fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    Alert.alert("PAS DE REINITIALISATION")
                    throw new Error('Erreur lors de la requête.');
                }
                return response.json(); // Renvoie les données JSON de la réponse
            })
            .then(data => {
                console.log(data)
                if (data[0].affectedRows == 1) {
                    Alert.alert("Un mail sur votre addresse IMT vous a été envoyé avec un nouveau mot de passe");
                    navigation.goBack()
                } else {
                    console.log("Refusé")
                }
            })
            .catch(error => {
                console.error('Erreur :', error);
            });  
    }
    return (
        <View style = {{flex : 1, backgroundColor : "white"}}>
          <StatusBar backgroundColor="#99cc33"/> 
          <ScrollView ref = {scrollContainer}>
            <View style = {styles.formContainer}>
                <Image source={require("../assets/logo.jpg")} style = {{height : 200, width : 300, alignSelf : "center"}}/>
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
                <View style = {styles.button}>
                    <Pressable onPress = {()=> ForgotPassword()}>
                        <Text style = {styles.buttonText}>Réinitialiser mon mot de passe</Text>
                    </Pressable>
                </View>
            </View>
            
            <View style = {{flex: 1, height : 100}}/>
            </ScrollView> 
        </View>
    )
 }


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

