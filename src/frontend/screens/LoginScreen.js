import {View, StyleSheet, Text, Pressable, StatusBar, Alert, TextInput, Image} from "react-native";
import React, {useState} from 'react';
import url from "../components/url.js";
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [prompts, setPrompts] = useState(['','']);
    function changePrompts(text,index) {
        const newPrompts = [...prompts];
        newPrompts[index] = text.trim().toUpperCase(); 
        setPrompts(newPrompts);
    }
    function signIn() {
        const dataToSend = {
            username: prompts[0],
            password: prompts[1],
            command : "signIn",
            type : null,
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
                    Alert.alert("PAS CONNECTÉ")
                    throw new Error('Erreur lors de la requête.');
                }
                return response.json(); // Renvoie les données JSON de la réponse
            })
            .then(data => {
                if (data[0].answer == "TRUE") {
                    navigation.replace("Main", {username : prompts[0], password : prompts[1]})
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
            <View style = {styles.formContainer}>
                <View>
                    <Text style={styles.text}>Nom d'utilisateur</Text>
                    <TextInput  style={styles.input}
                                onChangeText={(text) => changePrompts(text, 0)}/>
                </View>
                <View>
                    <Text style={styles.text}>Mot de passe</Text>
                    <TextInput  style={styles.input}
                                onChangeText={(text) => changePrompts(text, 1)}/>
                </View>
                <View style = {styles.button}>
                    <Pressable onPress = {()=>signIn()}>
                        <Text style = {styles.buttonText}> Se connecter </Text>
                    </Pressable>
                </View>
                <View style = {{alignItems : "center"}}>
                    <Pressable onPress={()=> Alert.alert("Fonctionalité à ajouter","Lors de la V3")}>    
                        <Text style = {{color : "#656565"}}>Créer un compte</Text>
                    </Pressable>
                    <Pressable onPress={()=> Alert.alert("Fonctionalité à ajouter","Lors de la V3")}>    
                        <Text style = {{color : "#0000ee", textDecorationLine : "underline"}}>Mot de passe oublié ?</Text>
                    </Pressable>
                </View>
            </View>
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