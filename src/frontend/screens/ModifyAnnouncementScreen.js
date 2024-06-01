import {View, StyleSheet, Text, Pressable, ScrollView, StatusBar, Alert, TextInput, Image} from "react-native";
import {useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import url from "../components/url.js";

function isValidPrice(str) {
  if (str == '') {
      return true;
  }
  const num = parseFloat(str);
  return !isNaN(num);
}

export default function ModifyAnnouncementScreen({route}) { 
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

    const [inputs, setInputs] = useState([
      route.params.content.departure, 
      route.params.content.arrival, 
      route.params.content.price.toString(), 
      route.params.content.nb_seat ? route.params.content.nb_seat.toString() : route.params.content.nb_seat, 
      route.params.content.comment]);
  
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
        request([[inputs[0], inputs[1], date.toLocaleString("sv-SE") ,inputs[2], inputs[3], inputs[4], route.params.content.id, route.params.id, route.params.password, route.params.id],
                  route.params.content.candidates,
                  route.params.content.passengers,
                  route.params.username])
      } else if (route.params.type == "request")  {
        request([[inputs[0], inputs[1], date.toLocaleString("sv-SE") ,inputs[2], inputs[4], route.params.content.id, route.params.id, route.params.password, route.params.id],
                  route.params.content.candidates,
                route.params.content.conductor,
                route.params.username])
      }
    }

    function request(parameters) {
        // Données à envoyer
        console.log(parameters)
        const dataToSend = {
        id: route.params.id,
        password: route.params.password,
        command : "modify_"+route.params.type,
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
                Alert.alert("Offre modifiée !", "Les candidats en ont été informés")
              } else if (route.params.type == "request") {
                Alert.alert("Requête modifiée !", "Les candidats en ont été informés")
              }
              setDate(new Date())
              setInputs(['','','','',''])
              navigation.goBack();
            } else {
              if (route.params.type == "offer") {
                Alert.alert("Désolé !", "Votre Offre n'a pas été enregistrée.")
              } else if (route.params.type == "request") {
                Alert.alert("Désolé !", "Votre Requête n'a pas été enregistrée.")
              }
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

                    <View style = {{flexDirection : "row", flex : 1}}>
                        <View style = {{flexDirection : "column"}}>
                            <View style = {{alignSelf : "center", borderWidth: 4, borderColor: '#000', borderRadius : 10, width : 20, height : 20}}/>
                            <View style = {{alignSelf : "center", height: '85%',width :0,  borderWidth: 3, borderColor: '#000', borderStyle: 'dashed'}}/>
                            <View style = {{alignSelf : "center", borderWidth: 4, borderColor: '#000', borderRadius : 10, width : 20, height : 20}}/>
                        </View>
                        <View style = {{flexDirection : "column", flex : 1}}>
                            { (route.params.type == "offer") ? 
                              <Image source = {require("../assets/offer.png")} style={{height: 200, width : 200, right: 0, bottom : 0,position : "absolute"}}/>
                              : <Image source = {require("../assets/request.png")} style={{height: 200, width : 200, right: 0, bottom : 0,position : "absolute"}}/>
                            }
                            <View style = {{flexDirection : "row"}}>                    
                                <Text style = {styles.destinations}>De </Text>
                                <TextInput value = {inputs[0]} style = {styles.input} onChangeText={(text) => changeInputs(text, 0)}/>
                            </View>
                            <View>
                                <View>
                                  <View style = {{flexDirection : "row", marginRight: 10}}>
                                    <Text style={styles.defaultText}>Le</Text>
                                    <Pressable onPress = {showDatepicker}>
                                      <Text style = {{padding : 1, paddingTop : 3, marginHorizontal : 2,  borderRadius : 10, borderColor : "#000", borderWidth:2, fontSize : 16}}> {date.toLocaleDateString("fr-FR")} </Text>
                                    </Pressable>
                                    <Text style = {styles.defaultText}>à</Text>
                                    <Pressable onPress = {showTimepicker}>
                                      <Text style = {{padding : 1, paddingTop : 3, marginHorizontal : 2,  borderRadius : 10, borderColor : "#000", borderWidth:2, fontSize : 16}}> {date.toLocaleTimeString("fr-FR").substring(0,5)} </Text>
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
                                  
                                  <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                                    <Text style={styles.defaultText}>Prix affiché : </Text>
                                    <View style ={{flexDirection:"row", flex : 0.27}}>
                                      <TextInput value = {inputs[2]} style = {{...styles.input, margin : 0, flex : 1}} onChangeText={(text) => changeInputs(text, 2)}/>
                                      <Text style = {styles.defaultText}> €</Text>
                                    </View>
                                  </View>
                                </View>
                                {(route.params.type == "offer") &&
                                    <View style = {{alignItems : "flex-start"}}>
                                      <View style ={{flexDirection:"row"}}>
                                        <TextInput value = {inputs[3]} style = {{...styles.input, margin : 0, minWidth : 25, flex : 0.1}} onChangeText={(text) => changeInputs(text, 3)}/>
                                        <Text style = {styles.defaultText}> place(s) restante(s)</Text>
                                      </View>
                                    </View>
                                  }
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
                setInputs([
                  route.params.content.departure, 
                  route.params.content.arrival, 
                  route.params.content.price.toString(), 
                  route.params.content.nb_seat ? route.params.content.nb_seat.toString() : route.params.content.nb_seat, 
                  route.params.content.comment]);
              }}>
                <Text style = {styles.buttonText}>Annuler</Text>
              </Pressable>
            </View>
            </ScrollView>  
        </View>
    );
};

const styles = StyleSheet.create({
  input : {
    height: 30,
    margin: 6,
    padding: 5,
    paddingLeft : 7,
    paddingRight : 7,
    borderRadius : 10,
    flex : 1,
    borderColor : "#000",
    borderWidth : 2,
    color : "#000",
    fontWeight : "bold"
  },
  destinations : {
    fontSize :  20,
    padding : 5,
    color : "#000",
    fontWeight : "bold"
  },
  defaultText : {
    fontSize :  14,
    padding : 5,
    color : "#000",
  },
  mainContainer : {
    backgroundColor : "#fff",
    color : "#000",
    borderRadius : 10,
    margin : 10,
    shadowColor: "#000",
    elevation: 5,
  },
  titleContainer : {
    backgroundColor : "#efefef",
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
    color : "#fff",
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