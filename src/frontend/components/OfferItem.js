import React from 'react';
import { Platform, UIManager, Pressable, View, Text, Button, LayoutAnimation, StyleSheet, Alert, Image } from 'react-native';
import url from "./url.js"

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const OfferItem = props => {  
  function toCandidate() {
    const dataToSend = {
      id: props.account.id,
      password: props.account.password,
      command : "apply_to_offer",
      parameters : [props.account.id, props.offer.id, props.offer.author],
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
          Alert.alert("Erreur de connexion", "Vérifier que l'état de la connexion")
          throw new Error('Erreur lors de la requête.');
        }
        return response.json(); // Renvoie les données JSON de la réponse
      })
      .then(data => {
        if (data[0].affectedRows == 0) {
          Alert.alert("Désolé !","Vous avez déjà candidaté à cette offre.")
        } else {
          Alert.alert("Candidature envoyée !", "Le conducteur n'a plus qu'à confirmer.")
        }
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
    
  }

  return (
    <View style = {{...styles.mainContainer}}>
        <View style = {{...styles.titleContainer}}>
          <View style = {{flexDirection : "row", justifyContent : "space-between"}}>
            <Text style = {styles.defaultText}>Par {props.offer.user}</Text>
            <Text style = {styles.defaultText}>{props.offer.price} €</Text>
          </View>

          <View style = {{flexDirection : "row", flex : 1}}>
            <View style = {{flexDirection : "column"}}>
              <View style = {{alignSelf : "center", borderWidth: 4, borderColor: 'white', borderRadius : 10, width : 20, height : 20}}/>
              <View style = {{alignSelf : "center", height: '85%',width :0,  borderWidth: 3, borderColor: 'white', borderStyle: 'dashed'}}/>
              <View style = {{alignSelf : "center", borderWidth: 4, borderColor: 'white', borderRadius : 10, width : 20, height : 20}}/>
            </View>
            <View style = {{flexDirection : "column", flex : 1}}>
                <Text style = {styles.destinations}>De {props.offer.departure}</Text>
              <View>
                <View style = {{alignItems : "flex-end", justifyContent : "space-between", flexDirection : "row"}}>
                  <Text style = {styles.defaultText}>Le {props.offer.date.substring(8,10)}/{props.offer.date.substring(5,7)}/{props.offer.date.substring(2,4)} à {props.offer.date.substring(11,13)}h{props.offer.date.substring(14,16)}</Text>
                  <Text style = {styles.defaultText}>{props.offer.nb_seat} place(s) restante(s)</Text>
                </View>
                <View style = {styles.revealContainer}>  
                  <View style = {styles.commentContainer}>
                    <Text style = {{...styles.defaultText, fontWeight : 'bold'}}>Infos supplémentaires :</Text>
                    <Text style = {styles.defaultText}>{props.offer.comment}</Text>
                    <View style={styles.buttonContainer}>
                      <Pressable onPress={toCandidate} style={styles.button}>
                        <Image source={require("../assets/flag.png")} style={{height: 22, width: 22}}/>
                        <Text style={styles.buttonText}> Candidater </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
              <View style = {{flexDirection : "row"}}>
                <Text style = {styles.destinations}>A {props.offer.arrival}</Text>
              </View>
            </View>


          </View>
        </View>
    </View>
  )
};
const styles = StyleSheet.create({
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
    backgroundColor : "#00b8de",
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
})
export default OfferItem;