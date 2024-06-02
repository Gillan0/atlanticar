import {View, StyleSheet, Text, Pressable, ScrollView, StatusBar, Alert, TextInput, Image} from "react-native";
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import url from "../misc/url.js";
import isValidPrice from "../checkFunctions/isValidPrice.js";


/**
 * Displays the screen where a user can create an 
 * announcement (offer / request)
 * 
 * @param {Route<string>} route - Navigation route
 * @returns {React.ReactElement}
 */
export default function CreateAnnouncementScreen({route}) { 
    // Get navigation
    const navigation = useNavigation();
  
    // Initializing variables for datetime picker
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    /**
     * Updates variables for datetime picker
     * when event occurs 
     * 
     * @param {*} event - Event
     * @param {Date} selectedDate - Selected date 
     */
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    /**
     * Changes mode (time / date) of datetime picker
     * 
     * @param {string} currentMode - Current mode of datetime picker
     */
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    /**
     * Shows datetime picker in 'date' mode
     */
    const showDatepicker = () => {
        showMode('date');
    };

    /**
     * Shows datetime picker in 'time' mode
     */
    const showTimepicker = () => {
        showMode('time');
    };

    // Initializes variables to store values of textinputs
    const [inputs, setInputs] = useState(['', '', '', '', '']);
  
    /**
     * Changes value of associated variable 
     * once textinput is updated
     * 
     * @param {string} text - New text
     * @param {number} index - Index in 'inputs' variable associated to said textinput  
     */
    const changeInputs = (text, index) => {
      const newInputs = [...inputs];
      newInputs[index] = text;
      setInputs(newInputs);
    };

    /**
     * Checks for any discrepancy in the textinputs
     * If none found, starts the HTTP request procedure
     */
    function pushButton() {

      // Check if departure is defined
      if (inputs[0] == "") {
        Alert.alert("Désolé !", "Merci d'indiquer un lieu de départ.")
        return;
      }

      // Check if arrival is defined
      if (inputs[1] == "") {
        Alert.alert("Désolé !", "Merci d'indiquer un lieu d'arrivée.")
        return;
      }

      // Check if price is defined
      if (inputs[2] == "") {
        Alert.alert("Désolé !", "Merci d'indiquer un tarif.")
        return;
      }

      // Check if price textinput is a positive number
      if (!isValidPrice(inputs[2])) {
        Alert.alert("Désolé", "Le tarif doit être un nombre.")
        return;
      }

      // Checks if number of seats is defined
      if (inputs[3] == "" && route.params.type == "offer") {
        Alert.alert("Désolé !", "Merci d'indiquer le nombre de places libres dans votre véhicule.")
        return;
      }

      // Checks if number of seats is a strictly positive integer
      if (!isValidPrice(inputs[3])) {
        Alert.alert("Désolé !", "Le nombre de places libres doit être plus grand que 0.")
        return;
      }

      // Checks for length of departure / arrival
      if (inputs[0].length >= 200 || inputs[1].length >= 200) {
        Alert.alert("Désolé !", "Merci d'indiquer un lieu de moins de 200 caractères")
        return;
      }

      // Checks for length of comment
      if (inputs[4].length >= 200) {
        Alert.alert("Désolé !", "Merci d'indiquer un commentaire de moins de 200 caractères")
        return;
      }

      // Starts HTTP request (offer / request case)
      if (route.params.type == "offer") {
        request([inputs[0], inputs[1], date.toLocaleString("sv-SE") ,inputs[2], inputs[3], inputs[4], route.params.id])
      } else if (route.params.type == "request")  {
        request([inputs[0], inputs[1], date.toLocaleString("sv-SE") ,inputs[2], inputs[4], route.params.id])
      }
    }

    /**
     * Sends a HTTP request to the server and changes rendered 
     * announcements based on answer
     * 
     * @param {String} command - command interpreted by server
     * @param {Array<*>} parameters - parameters for the sql script 
     */
    function request(parameters) {
      
        // Data to send to server
        const dataToSend = {
          id: route.params.id,
          password: route.params.password,
          command : "upload_"+route.params.type,
          parameters : parameters
        };
    
        // HTTP request options
        const requestOptions = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend) // Convertir les données en format JSON
        };
    
        // Sends HTTP request
        fetch(url, requestOptions)

          // Checks if answer exploitable
          .then(response => {
              if (!response.ok) {
              throw new Error('Erreur lors de la requête.');
              }
              return response.json(); // Renvoie les données JSON de la réponse
          })

          .then(data => {
              console.log('Recieved data');
              
              // If database was changed
              if (data[0].affectedRows == 1) {
              
                // Pop up confirmation message
                if (route.params.type == "offer") {
                  Alert.alert("Offer enregistrée !", "Les autres usagers peuvent y candidater")
                } else if (route.params.type == "request") {
                  Alert.alert("Requête enregistrée !", "Les autres usagers peuvent y candidater")
                }
              
                // Resets textinputs and datetime picker
                setDate(new Date())
                setInputs(['','','','',''])
                
                // Go to main offer / request screen
                if (route.params.type == "offer") {
                  navigation.replace("OffersList", route.params)
                } else if (route.params.type == "request") {
                  navigation.replace("RequestsList", route.params)
                }
              
              } else {
                // Pop up message : database unchanged 
                Alert.alert("Désolé !", "Votre Offre n'a pas été enregistrée.")
              
              }
          })

          // Error failsafe
          .catch(error => {
              console.error('Erreur :', error);
          });  
    }

    return (
        <View>
            
            <StatusBar backgroundColor="#99cc33"/>  

            <ScrollView>

              {/* Main container for Announcement Item */}
              <View style = {{...styles.mainContainer}}>

                  <View style = {{...styles.titleContainer}}>

                      {/* Author */}
                      <View style = {{flexDirection : "row", justifyContent : "space-between"}}>
                          <Text style = {styles.defaultText}>Par {route.params.username}</Text>
                      </View>

                      <View style = {{flexDirection : "row", flex : 1}}>

                          {/* Pattern on the left */}
                          <View style = {{flexDirection : "column"}}>
                      
                              <View style = {{alignSelf : "center", borderWidth: 4, borderColor: 'white', borderRadius : 10, width : 20, height : 20}}/>
                      
                              <View style = {{alignSelf : "center", height: '85%',width :0,  borderWidth: 3, borderColor: 'white', borderStyle: 'dashed'}}/>
                      
                              <View style = {{alignSelf : "center", borderWidth: 4, borderColor: 'white', borderRadius : 10, width : 20, height : 20}}/>
                      
                          </View>
                      
                          {/*  */}
                          <View style = {{flexDirection : "column", flex : 1}}>
                              
                              {/* Background logo */}
                              { (route.params.type == "offer") ? 
                                <Image source = {require("../assets/gold_offer.png")} style={{height: 200, width : 200, right: 0, bottom : 0,position : "absolute"}}/>
                                : <Image source = {require("../assets/gold_request.png")} style={{height: 200, width : 200, right: 0, bottom : 0,position : "absolute"}}/>
                              }

                              {/* Departure */}
                              <View style = {{flexDirection : "row"}}>                    
                                  <Text style = {styles.destinations}>De </Text>
                                  <TextInput value = {inputs[0]} style = {styles.input} onChangeText={(text) => changeInputs(text, 0)}/>
                              </View>


                              <View>

                                  {/* Choose date */}
                                  <View>

                                    <View style = {{flexDirection : "row"}}>
                                      
                                      <Text style={styles.defaultText}>Le</Text>
                                      
                                      <Pressable onPress = {showDatepicker}>
                                      
                                        <Text style = {{padding : 1, paddingTop : 3, marginHorizontal : 2,  borderRadius : 10, color:"#fff",borderColor : "#fff", borderWidth:2, fontSize : 16}}> {date.toLocaleDateString("fr-FR")} </Text>
                                      
                                      </Pressable>
                                      
                                      <Text style = {styles.defaultText}>à</Text>
                                      
                                      <Pressable onPress = {showTimepicker}>
                                      
                                        <Text style = {{padding : 1, paddingTop : 3, marginHorizontal : 2,  borderRadius : 10, color:"#fff", borderColor : "#fff", borderWidth:2, fontSize : 16}}> {date.toLocaleTimeString("fr-FR").substring(0,5)} </Text>
                                      
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
                                  
                                  </View>
                                  
                                  {/* Price */}
                                  <View style = {{flexDirection : "row", marginTop : 5}}>
                                  
                                      <Text style = {styles.defaultText}>{route.params.type == "offer" ? "Prix par personne" : "Prix reçu par le conducteur"} : </Text>
                                  
                                      <TextInput value = {inputs[2]} style = {{...styles.input, margin : 0, flex : 1}} onChangeText={(text) => changeInputs(text, 2)}/>
                                  
                                      <Text style = {styles.defaultText}> €</Text>
                                  
                                  </View> 
                                  
                                  {/* Number seat */}
                                  {(route.params.type == "offer") &&
                                      <View style ={{flexDirection:"row", paddingLeft : 5, marginTop : 5}}>
                                        <TextInput value = {inputs[3]} style = {{...styles.input, margin : 0, minWidth : 25, flex : 0.1}} onChangeText={(text) => changeInputs(text, 3)}/>
                                        <Text style = {styles.defaultText}> place(s) restante(s)</Text>
                                      </View>
                                    }

                                  {/* Comment */}
                                  <View style = {styles.revealContainer}>  
                                      <View style = {styles.commentContainer}>
                                          <Text style = {{...styles.defaultText, fontWeight : 'bold'}}>Infos supplémentaires :</Text>
                                          <TextInput value = {inputs[4]} style = {{...styles.input, height : 100}} onChangeText={(text) => changeInputs(text, 4)} multiline = {true}/>
                                      </View>
                                  </View>

                              </View>

                              {/* Arrival */}
                              <View style = {{flexDirection : "row"}}>                    
              
                                  <Text style = {styles.destinations}>A </Text>
              
                                  <TextInput value = {inputs[1]} style = {styles.input} onChangeText={(text) => changeInputs(text, 1)}/>
              
                              </View>
              
                          </View>
              
                      </View>
                  
                  </View>
              
              </View>
              
              {/* Buttons */}
              <View style = {{flexDirection : "row", alignSelf : "center"}}>
                
                {/* Confirm Button */}
                <Pressable style = {styles.buttonContainer} onPress = {pushButton}>
                
                  <Text style = {styles.buttonText}>Valider</Text>
                
                </Pressable>
                
                {/* Cancel Button */}
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


// Stylesheet for this screen
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