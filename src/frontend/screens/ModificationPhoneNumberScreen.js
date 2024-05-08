import {View, StyleSheet, Text, Pressable, StatusBar, Alert, TextInput, Image} from "react-native";
import React, {useState} from 'react';
import url from "../components/url.js";
import { useNavigation } from '@react-navigation/native';

export default function ModificationPhoneNumberScreen({route}) {
    
    const navigation = useNavigation();
    const [prompts, setPrompts] = useState(['']);
    function changePrompts(text,index) {
        const newPrompts = [...prompts];
        newPrompts[index] = text.trim(); 
        setPrompts(newPrompts);
    }
    function ModificationPhoneNumber() {
        if (prompts[0].length != 10) {
            Alert.alert("Désolé !", "Merci de renseigner un numéro de téléphone valide")
            return;
        }

        function neContientQueDesChiffres(saisie) {
            return /^\d+$/.test(saisie);
        }

        if (!neContientQueDesChiffres(prompts[0])) {
            Alert.alert('Erreur !', 'Le numéro de téléphone doit contenir uniquement des chiffres.');
            return;
        }

        const dataToSend = {
            new_phone_number: prompts[0],
            phone_number : route.params.phone_number,
            command : "modificationphonenumber",
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
                if (data[0][0].answer == "FALSE") {
                    Alert.alert("Votre numéro de téléphone a bien été modifié");
                    navigation.replace("Account", {phone_number: prompts[0]})
                } else {
                    console.log("Refusé");
                    Alert.alert("Désolé !", "Ce numéro de téléphone est déjà utilisé par un autre utilisateur")
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
                    <Text style={styles.text}>Entrez votre nouveau numéro de téléphone :</Text>
                    <TextInput  style={styles.input}
                                secureTextEntry={false}
                                onChangeText={(text) => changePrompts(text, 0)}/>
                </View>
                <View style = {styles.button}>
                    <Pressable onPress = {()=> ModificationPhoneNumber()}>
                        <Text style = {styles.buttonText}> Modifier mon numéro de téléphone </Text>
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
