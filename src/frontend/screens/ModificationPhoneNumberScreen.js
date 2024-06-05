import {View, StyleSheet, Text, Pressable, StatusBar, Alert, TextInput, Image, ScrollView} from "react-native";
import React, {useState} from 'react';
import url from "../misc/url.js";
import { useNavigation } from '@react-navigation/native';
import isOnlyNumbers from "../checkFunctions/isOnlyNumbers.js"
import SHA256 from 'crypto-js/sha256';

/**
 * Displays screen where user can change his account's 
 * phone number
 * @param {Route<string>} route - Navigation route 
 * @returns {React.ReactElement}
 */
export default function ModificationPhoneNumberScreen({route}) {
    // Get navigation
    const navigation = useNavigation();
        
    // Initializes variables to store the phone number
    const [phone, setPhone] = useState('');

    /**
     * Sends a HTTP request to server to change the user's
     * phone number
     * 
     * @returns {null} 
     */
    function ModificationPhoneNumber() {
        // Checks phone number length
        if (phone.length != 10) {
            Alert.alert("Désolé !", "Merci de renseigner un numéro de téléphone valide")
            return;
        }

        // Checks if prompt is made of numbers
        if (!isOnlyNumbers(phone)) {
            Alert.alert('Erreur !', 'Le numéro de téléphone doit contenir uniquement des chiffres.');
            return;
        }
        // Data to send to server
        const dataToSend = {
            id: route.params.id,
            password: SHA256(route.params.password).toString(),
            command : "modify_phone_number",
            parameters : [phone.match(/.{1,2}/g).join(' '),]
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
                    Alert.alert("Votre numéro de téléphone a bien été modifié");
                    navigation.goBack()
                    navigation.replace("Account", {...route.params, phone_number: phone.match(/.{1,2}/g).join(' ')})
                } else {
                    // Pop up error message
                    Alert.alert("Désolé !", "Ce numéro de téléphone est déjà utilisé par un autre utilisateur")
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
          
          <ScrollView>
          
            <View style = {styles.formContainer}>

                {/* App Logo */}          
                <Image source={require("../assets/logo.jpg")} style = {{height : 200, width : 300, alignSelf : "center"}}/>
          
                {/* New phone number text input */}
                <View>
          
                    <Text style={styles.text}>Entrez votre nouveau numéro de téléphone :</Text>
          
                    <TextInput  value = {phone ? phone.match(/.{1,2}/g).join(' ') : ''}
                                style={styles.input}
                                secureTextEntry={false}
                                onChangeText={(text) => setPhone(text.replace(/\s/g, ''))}/>
                
                </View>
                
                {/* Confirmation button */}
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
