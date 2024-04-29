import {View, StyleSheet, Text, Pressable, ScrollView, StatusBar, Button, Alert, TextInput, Image} from "react-native";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, {useState, useRef, useCallback} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import url from "../components/url.js";
/*
Gray : #cbcbcb
Light blue : #00b8de
Dark blue : #0c2340
Green : #99cc33
*/ 

function isValidPrice(str) {
  if (str == '') {
      return true;
  }
  const num = parseFloat(str);
  return !isNaN(num);
}

export default function CreateAnnouncementScreen({route}) { 
    const navigation = useNavigation();
  
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };
    const showTimepicker = () => {
        showMode('time');
    };

    const [inputs, setInputs] = useState(['', '', '', '', '']);
  
    const changeInputs = (text, index) => {
      const newInputs = [...inputs];
      newInputs[index] = text;
      setInputs(newInputs);
    };

    function pushButton() {
      if (inputs[0] == "") {
        Alert.alert("Désolé !", "Merci d'indiquer un lieu de départ.")
        return;
      }
      if (inputs[1] == "") {
        Alert.alert("Désolé !", "Merci d'indiquer un lieu d'arrivée.")
        return;
      }
      if (inputs[2] == "") {
        Alert.alert("Désolé !", "Merci d'indiquer un tarif.")
        return;
      }
      if (!isValidPrice(inputs[2])) {
        Alert.alert("Désolé", "Le tarif doit être un nombre.")
        return;
      }
      if (inputs[3] == "" && route.params.type == "offer") {
        Alert.alert("Désolé !", "Merci d'indiquer le nombre de places libres dans votre véhicule.")
        return;
      }
      if (!isValidPrice(inputs[3])) {
        Alert.alert("Désolé !", "Le nombre de places libres doit être plus grand que 0.")
        return;
      }
      if (inputs[0].length >= 200 || inputs[1].length >= 200) {
        Alert.alert("Désolé !", "Merci d'indiquer un lieu de moins de 200 caractères")
        return;
      }
      if (inputs[4].length >= 200) {
        Alert.alert("Désolé !", "Merci d'indiquer un commentaire de moins de 200 caractères")
        return;
      }
      if (route.params.type == "offer") {
        request([inputs[0], inputs[1], date.toLocaleString("sv-SE") ,inputs[2], inputs[3], inputs[4], route.params.id])
      } else if (route.params.type == "request")  {
        request([inputs[0], inputs[1], date.toLocaleString("sv-SE") ,inputs[2], inputs[4], route.params.id])
      }
    }

    function request(parameters) {
        // Données à envoyer
        const dataToSend = {
        id: route.params.id,
        password: route.params.password,
        command : "upload_"+route.params.type,
        parameters : parameters
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
            throw new Error('Erreur lors de la requête.');
            }
            return response.json(); // Renvoie les données JSON de la réponse
        })
        .then(data => {
            console.log('Recieved data');
            if (data[0].affectedRows == 1) {
              if (route.params.type == "offer") {
                Alert.alert("Offer enregistrée !", "Les autres usagers peuvent y candidater")
              } else if (route.params.type == "request") {
                Alert.alert("Requête enregistrée !", "Les autres usagers peuvent y candidater")
              }
              setDate(new Date())
              setInputs(['','','','',''])
              if (route.params.type == "offer") {
                navigation.replace("OffersList", route.params)
              } else if (route.params.type == "request") {
                navigation.replace("RequestsList", route.params)
              }
            } else {
              Alert.alert("Désolé !", "Votre Offre n'a pas été enregistrée.")
            }
        })
        .catch(error => {
            console.error('Erreur :', error);
        });  
    }

    return (
        <View>
            <StatusBar backgroundColor="#99cc33"/>  
            <ScrollView>

            
            <View style = {{...styles.mainContainer}}>
                <View style = {{...styles.titleContainer}}>
                    <View style = {{flexDirection : "row", justifyContent : "space-between"}}>
                        <Text style = {styles.defaultText}>Par {route.params.username}</Text>
                        <View style ={{flexDirection:"row", flex : 0.3}}>
                            <TextInput value = {inputs[2]} style = {{...styles.input, margin : 0}} onChangeText={(text) => changeInputs(text, 2)}/>
                            <Text style = {styles.defaultText}> €</Text>
                        </View>
                    </View>

                    <View style = {{flexDirection : "row", flex : 1}}>
                        <View style = {{flexDirection : "column"}}>
                            <View style = {{alignSelf : "center", borderWidth: 4, borderColor: 'white', borderRadius : 10, width : 20, height : 20}}/>
                            <View style = {{alignSelf : "center", height: '85%',width :0,  borderWidth: 3, borderColor: 'white', borderStyle: 'dashed'}}/>
                            <View style = {{alignSelf : "center", borderWidth: 4, borderColor: 'white', borderRadius : 10, width : 20, height : 20}}/>
                        </View>
                        <View style = {{flexDirection : "column", flex : 1}}>
                            { (route.params.type == "offer") ? 
                              <Image source = {require("../assets/gold_offer.png")} style={{height: 200, width : 200, right: 0, bottom : 0,position : "absolute"}}/>
                              : <Image source = {require("../assets/gold_request.png")} style={{height: 200, width : 200, right: 0, bottom : 0,position : "absolute"}}/>
                            }
                            <View style = {{flexDirection : "row"}}>                    
                                <Text style = {styles.destinations}>De </Text>
                                <TextInput value = {inputs[0]} style = {styles.input} onChangeText={(text) => changeInputs(text, 0)}/>
                            </View>
                            <View>
                                <View style = {{flexDirection : "row"}}>
                                  <View style = {{flexDirection : "row", marginRight: 10}}>
                                    <Text style={styles.defaultText}>Le</Text>
                                    <Pressable onPress = {showDatepicker}>
                                      <Text style = {{...styles.defaultText, paddingHorizontal : 0, color : "#0000ee", textDecorationLine : "underline"}}>{date.toLocaleDateString("fr-FR")}</Text>
                                    </Pressable>
                                    <Text style = {styles.defaultText}>à</Text>
                                    <Pressable onPress = {showTimepicker}>
                                      <Text style = {{...styles.defaultText, paddingHorizontal : 0, color : "#0000ee", textDecorationLine : "underline"}}>{date.toLocaleTimeString("fr-FR").substring(0,5)}</Text>
                                    </Pressable>
                                    {show && (
                                        <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        onChange={onChange}
                                        />
                                    )}
                                  </View>
                                  {(route.params.type == "offer") &&
                                    <View style ={{flexDirection:"row"}}>
                                      <TextInput value = {inputs[3]} style = {{...styles.input, margin : 0, minWidth : 25}} onChangeText={(text) => changeInputs(text, 3)}/>
                                      <Text style = {styles.defaultText}> place(s) restante(s)</Text>
                                    </View>
                                  }
                                </View>
                                <View style = {styles.revealContainer}>  
                                    <View style = {styles.commentContainer}>
                                        <Text style = {{...styles.defaultText, fontWeight : 'bold'}}>Infos supplémentaires :</Text>
                                        <TextInput value = {inputs[4]} style = {{...styles.input, height : 100}} onChangeText={(text) => changeInputs(text, 4)} multiline = {true}/>
                                    </View>
                                </View>
                            </View>
                            <View style = {{flexDirection : "row"}}>                    
                                <Text style = {styles.destinations}>A </Text>
                                <TextInput value = {inputs[1]} style = {styles.input} onChangeText={(text) => changeInputs(text, 1)}/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            
            <View style = {{flexDirection : "row", alignSelf : "center"}}>
              <Pressable style = {styles.buttonContainer} onPress = {pushButton}>
                <Text style = {styles.buttonText}>Valider</Text>
              </Pressable>
              <Pressable style = {{...styles.buttonContainer, backgroundColor : "#cc4400"}} onPress = {() =>
              {
                setDate(new Date());
                setInputs(['','','','','']);
              }}>
                <Text style = {styles.buttonText}>Annuler</Text>
              </Pressable>
            </View>
            </ScrollView>  
        </View>
    );
};

const styles = StyleSheet.create({
  offerItemContainer : {
    colorInactiveTitle : "#00b8de",
    colorActiveTitle : "#99cc33",
    titleSize : 15,
    titleColor : "#ffffff",
    titleBorderRadius : 10,
    titlePadding : 10,
    margin : 7,
    childrenPadding : 10,
    childrenBorderRadius : 10,
    childrenBackgroundColor : "#55fcff"
  },
  offerItemDetails : {
    buttonColor : "#ddb500",
    textFontSize :  15,
    textColor : "#000000"
  },
  input : {
    height: 30,
    margin: 6,
    padding: 5,
    paddingLeft : 7,
    paddingRight : 7,
    borderRadius : 10,
    flex : 1,
    borderColor : "#fff",
    borderWidth : 2,
    color : "#fff",
    fontWeight : "bold"
  },
  destinations : {
    fontSize :  20,
    padding : 5,
    color : "#fff",
    fontWeight : "bold"
  },
  defaultText : {
    fontSize :  14,
    padding : 5,
    color : "#fff",
  },
  mainContainer : {
    backgroundColor : "#fff",
    color : "#111111",
    borderRadius : 10,
    margin : 10,
    shadowColor: "#000",
    elevation: 5,
  },
  titleContainer : {
    backgroundColor : "#ddb500",
    borderRadius : 10,
    padding : 10,
    fontSize : 20
  },
  revealContainer : {
    padding : 10,
  },
  button : {
    flexDirection : "row",
    alignSelf : "center"
  },
  buttonText : {
    color : "#ffffff",
    fontSize : 18,
    fontWeight : 'bold'
  },
  buttonContainer : { 
    margin : 10,
    borderRadius: 10,
    padding: 7,
    backgroundColor: "#99cc33",
    shadowColor: "#000",
    elevation: 5,
    alignSelf : "center",
  }
});