import {View, StyleSheet, Text, Pressable, StatusBar, Alert, TextInput, Image, ScrollView} from "react-native";
import React, {useState} from 'react';
import url from "../components/url.js";
import { useNavigation } from '@react-navigation/native';

export default function ModificationPhoneNumberScreen({route}) {
    
    const navigation = useNavigation();
    const [phone, setPhone] = useState('');

    function ModificationPhoneNumber() {
        if (phone.length != 10) {
            Alert.alert("Désolé !", "Merci de renseigner un numéro de téléphone valide")
            return;
        }

        function neContientQueDesChiffres(saisie) {
            return /^\d+$/.test(saisie);
        }

        if (!neContientQueDesChiffres(phone)) {
            Alert.alert('Erreur !', 'Le numéro de téléphone doit contenir uniquement des chiffres.');
            return;
        }

        const dataToSend = {
            id: route.params.id,
            password: route.params.password,
            command : "modify_phone_number",
            parameters : [phone.match(/.{1,2}/g).join(' '),]
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
                    Alert.alert("Votre numéro de téléphone a bien été modifié");
                    navigation.goBack()
                    navigation.replace("Account", {...route.params, phone_number: phone.match(/.{1,2}/g).join(' ')})
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
          <ScrollView>
            <View style = {styles.formContainer}>
                <Image source={require("../assets/logo.jpg")} style = {{height : 200, width : 300, alignSelf : "center"}}/>
                <View>
                    <Text style={styles.text}>Entrez votre nouveau numéro de téléphone :</Text>
                    <TextInput  value = {phone ? phone.match(/.{1,2}/g).join(' ') : ''}
                                style={styles.input}
                                secureTextEntry={false}
                                onChangeText={(text) => setPhone(text.replace(/\s/g, ''))}/>
                </View>
                <View style = {styles.button}>
                    <Pressable onPress = {()=> ModificationPhoneNumber()}>
                        <Text style = {styles.buttonText}> Modifier mon numéro de téléphone </Text>
                    </Pressable>
                </View>
            </View>
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
