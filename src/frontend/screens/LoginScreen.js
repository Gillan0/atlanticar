import {View, StyleSheet, Text, Pressable, StatusBar, Alert, TextInput, Image, ScrollView} from "react-native";
import React, {useState} from 'react';
import url from "../components/url.js";
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [prompts, setPrompts] = useState(['','']);
    function changePrompts(text,index) {
        const newPrompts = [...prompts];
        newPrompts[index] = text.trim(); 
        setPrompts(newPrompts);
    }
    function signIn() {
        
        function ContientlecaractèreIMT(saisie){
            return saisie.includes("@imt-atlantique.net");
        }


        if (prompts[0] == "") {
            Alert.alert("Désolé !", "Merci de renseigner votre addresse mail IMT Atlantique")
            return;
        }
        if (prompts[1] == "") {
            Alert.alert("Désolé !", "Merci de renseigner un mot de passe")
            return;
        }

        if(!ContientlecaractèreIMT(prompts[0])){
            Alert.alert('Erreur !', 'L\'adresse mail doit être une adresse mail IMT.');
            return;
        }

        const dataToSend = {
            email: prompts[0],
            password: prompts[1],
            command : "signIn",
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
                console.log(data)
                    if (data[0][0].answer == "TRUE") {
                        navigation.replace("Main", {id : data[0][0].id, username : data[1][0].user, password : prompts[1], phone_number : data[1][0].phone_number, email: prompts[0]})
                } else {
                    console.log("Refusé")
                }
            })
            .catch(error => {
                Alert.alert("Désolé !", "Nom d'utilisateur ou mot de passe incorrect")
                console.error('Erreur :', error);
            });  
    }
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar backgroundColor="#99cc33" />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.formContainer}>
                    <Image source={require("../assets/logo.jpg")} style={styles.logo} />
                    <View>
                        <Text style={styles.text}>Addresse mail IMT</Text>
                        <TextInput style={styles.input}
                            onChangeText={(text) => changePrompts(text, 0)} />
                    </View>
                    <View>
                        <Text style={styles.text}>Mot de passe</Text>
                        <TextInput style={styles.input}
                            secureTextEntry={true}
                            onChangeText={(text) => changePrompts(text, 1)} />
                    </View>
                    <View style={styles.button}>
                        <Pressable onPress={() => signIn()}>
                            <Text style={styles.buttonText}> Se connecter </Text>
                        </Pressable>
                    </View>
                    <View style={styles.linksContainer}>
                        <Pressable onPress={() => navigation.navigate('SignUp')}>
                            <Text style={[styles.linkText, { color: "#00b8de" }]}>Créer un compte</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text style={[styles.linkText, { color: "#00b8de" }]}>Mot de passe oublié ?</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

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

