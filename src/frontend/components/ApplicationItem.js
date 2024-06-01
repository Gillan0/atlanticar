import React, { useState } from 'react';
import { Platform, UIManager, Pressable, View, Text, StyleSheet, Alert, Image } from 'react-native';
import url from "../misc/url.js"


if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default ApplicationItem = props => {
  const [render, setRender] = useState(true);
  const [showPhone, setShowPhone] = useState(false);
  function del() {
    const dataToSend = {
      id: props.id,
      password: props.account.password,
      command: props.content.type === 'offer' ? "delete_application_offer" : "delete_application_request",
      parameters: [[props.account.id, props.content.id, props.content.author],[props.content.author , props.account.username]],
    };

    // Envoi de la requête avec fetch
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          Alert.alert('Erreur de connexion', 'Vérifiez l\'état de la connexion');
          throw new Error('Erreur lors de la requête.');
        }
        return response.json();
      })
      .then((data) => {
        if (data[0].affectedRows) {
          setRender(!render)
        } else {
          Alert.alert("Error", "No affected Rows")
        }
      })
      .catch((error) => 
        console.error('Erreur :', error)
      );

  }
  return (
    <>
      {render ?
        <View style = {styles.mainContainer}>
        <View style = {styles.titleContainer}>
          <View style = {{flexDirection : "row", justifyContent : "space-between"}}>
            <Text style = {styles.defaultText}>Par {props.content.author}</Text>
            <Pressable onPress={()=>del()}>
              <Image source={require('../assets/bin.png')} style={{ width: 30, height: 30}} />
            </Pressable>
          </View>
          <View style = {{flexDirection : "row", flex : 1}}>
            <View style = {{flexDirection : "column"}}>
              <View style = {{alignSelf : "center", borderWidth: 4, borderColor: 'black', borderRadius : 10, width : 20, height : 20}}/>
              <View style = {{alignSelf : "center", height: props.content.state == "True" ? (props.content.comment ? '87%' : '83%' ) : (props.content.comment ? '83%' : '80%' ),width :0,  borderWidth: 3, borderColor: 'black', borderStyle: 'dashed'}}/>
              <View style = {{alignSelf : "center", borderWidth: 4, borderColor: 'black', borderRadius : 10, width : 20, height : 20}}/>
            </View>
            <View style = {{flexDirection : "column", flex : 1}}>
                    {
                      props.content.state == "True" ? <Image source = {require("../assets/white_checkmark.png")} style={{height: 200, width : 200, right: 0, top : 30, position : "absolute"}}/>
                      : <Image source = {require("../assets/white_clock.png")} style={{height: 200, width : 200, right: 0, bottom : 0, position : "absolute"}}/>
                    }
                <Text style = {styles.destinations}>De {props.content.departure}</Text>
              <View>
                <View style = {{flexDirection : "row", justifyContent : "space-between"}}>
                  <Text style = {styles.defaultText}>Le {props.content.date.substring(8,10)}/{props.content.date.substring(5,7)}/{props.content.date.substring(2,4)} à {props.content.date.substring(11,13)}h{props.content.date.substring(14,16)}</Text>
                  <Text style = {styles.defaultText}>{props.content.price} €</Text>
                </View>
                <View style = {styles.revealContainer}>  
                  <View>
                    {props.content.comment && (
                    <>
                      <Text style = {{...styles.defaultText, fontWeight : 'bold'}}>Infos supplémentaires :</Text>
                      <View style = {{flexDirection : "row", justifyContent : "space-between"}}>                
                        <Text style = {styles.defaultText}>{props.content.comment}</Text>
                      </View>
                    </>
                    )
                    } 
                    <Text style = {{...styles.defaultText, fontWeight : 'bold'}}>État de votre candidature : </Text>
                      <View style = {{flexDirection : "row", justifyContent : "space-between"}}>                
                        {props.content.state == "True" ? 
                        <View style = {{flexDirection : "column"}}>
                          
                          <Text style = {styles.defaultText}>Accepté !</Text>
                          <View style = {{justifyContent : "flex-start"}}>
                            <Text style = {{...styles.defaultText, fontWeight : 'bold'}}>Numéro de téléphone du conducteur : </Text>
                            <View style = {{flex : 1, flexDirection : "row", justifyContent : "space-between", paddingHorizontal : 3}}>
                              <View style = {{flex : 0.90, justifyContent : "center"}}>
                                  <Text> {showPhone ? props.content.phone :"• •  ".repeat(5)}</Text>
                              </View>
                              <View style = {{flexDirection : "row", flex : 0.10, justifyContent : "space-around"}}>
                                <Pressable style = {{borderRadius : 5, borderWidth : 1, borderColor : "#808080"}} onPress={() => setShowPhone(! showPhone)}>
                                    <Image source = { showPhone ? require("../assets/eye_closed.png") : require("../assets/eye.png")} style = {{height : 25, width : 25}}/>
                                </Pressable>
                              </View>
                            </View>
                          </View>
                        </View>
                        
                        : 
                        <Text style = {styles.defaultText}>En attente ...</Text>
                        }
                      </View>    
                  </View>
                </View>
              </View>
              <View style = {{flexDirection : "row"}}>
                <Text style = {styles.destinations}>A {props.content.arrival}</Text>
              </View>
            </View>
          </View>
        </View>

    </View>
      : null}
    </>
    
  )
};
const styles = StyleSheet.create({
  destinations : {
    fontSize :  20,
    padding : 5,
    color : "#000",
    fontWeight : "bold",
  },
  defaultText : {
    fontSize :  14,
    padding : 5,
    color : "#000",
  },
  mainContainer : {
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
  acceptedContainer : {
    backgroundColor : "#afcb37",
    borderRadius : 10,
    padding : 10,
    fontSize : 20,
  },
  revealContainer : {
    padding : 10,
  },
  button : {
    flexDirection : "row",
    alignSelf : "center"
  },
  buttonText : {
    color : "#000",
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