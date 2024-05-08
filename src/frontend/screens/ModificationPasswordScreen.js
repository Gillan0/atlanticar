import {View, StyleSheet, Text, Pressable, StatusBar, Alert, TextInput, Image} from "react-native";
import React, {useState} from 'react';
import url from "../components/url.js";
import { useNavigation } from '@react-navigation/native';

export default function ModificationPasswordScreen({route}) {
    
    const navigation = useNavigation();
    const [prompts, setPrompts] = useState(['']);
    function changePrompts(text,index) {
        const newPrompts = [...prompts];
        newPrompts[index] = text.trim(); 
        setPrompts(newPrompts);
    }
    function ModificationPassword() {
        if (prompts[0] == "") {
            Alert.alert("Désolé !", "Merci de renseigner un mot de passe valide")
            return;
        }

        const dataToSend = {
            password: prompts[0],
            phone_number : route.params.phone_number,
            command : "modificationpassword",
            parameters : [prompts[0], route.params.phone_number]
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
                    Alert.alert("PAS DE MODIFICATION")
                    throw new Error('Erreur lors de la requête.');
                }
                return response.json(); // Renvoie les données JSON de la réponse
            })
            .then(data => {
                console.log(data)
                if (data[0].affectedRows == 1) {
                    Alert.alert("Votre mot de passe a bien été modifié");
                    navigation.replace("Account", {password: prompts[0]})
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
                <Image source={require("../assets/logo.jpg")} style = {{height : 200, width : 300, alignSelf : "center"}}/>
                <View>
                    <Text style={styles.text}>Veuillez entrer votre nouveau mot de passe :</Text>
                    <TextInput  style={styles.input}
                                secureTextEntry={true}
                                onChangeText={(text) => changePrompts(text, 0)}/>
                </View>
                <View style = {styles.button}>
                    <Pressable onPress = {()=> ModificationPassword()}>
                        <Text style = {styles.buttonText}> Modifier mon mot de passe </Text>
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
