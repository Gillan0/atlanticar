import React from 'react';
import { View, Text, Pressable, Image, StyleSheet, Alert } from 'react-native';

export default function CreatedItem(props) {
  // Fonction d'acceptation ou de refus d'une candidature
  function accept(bool, id_candidate) {
    const dataToSend = {
      id: props.id,
      password: props.password,
      command: props.content.type === 'offer' ? (bool ? 'accept_application_offer' : 'refuse_application_offer') : (bool ? 'accept_application_request' : 'refuse_application_request'),
      parameters: props.content.type === 'offer' ? [[id_candidate, props.content.id], [id_candidate, props.content.id, props.id], [props.content.id]] : [[id_candidate, props.content.id, props.id], [id_candidate, props.content.id]],
    };

    // Envoi de la requête avec fetch
    fetch('url', {
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
      .catch((error) => console.error('Erreur :', error));
  }

  return (
    <View style={styles.mainContainer}>
      <View style={{ ...styles.titleContainer }}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ alignSelf: 'center', borderWidth: 4, borderColor: 'black', borderRadius: 10, width: 20, height: 20 }} />
            <View style={{ alignSelf: 'center', height: '80%', borderWidth: 3, borderColor: 'black', borderStyle: 'dashed' }} />
            <View style={{ alignSelf: 'center', borderWidth: 4, borderColor: 'black', borderRadius: 10, width: 20, height: 20 }} />
          </View>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <Text style={styles.destinations}>De {props.content.departure}</Text>
            <View>
              <Text style={styles.defaultText}>Le {props.content.date.substring(8, 10)}/{props.content.date.substring(5, 7)}/{props.content.date.substring(2, 4)} à {props.content.date.substring(11, 13)}h{props.content.date.substring(14, 16)}</Text>
              <View style={styles.revealContainer}>
                {props.candidates && props.candidates.length > 0 ? (
                  <>
                    <Text style={{ ...styles.defaultText, fontWeight: 'bold' }}>Candidatures :</Text>
                    {Object.values(props.candidates).map((value, key) => {
                      if (value) {
                        const [id, name] = value.split(':'); // Assurez-vous que `value` n'est pas `undefined`
                        return (
                          <View key={key} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.defaultText}>{name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                              <Pressable onPress={() => accept(true, parseInt(id, 10))}>
                                <Image source={require('../assets/checkmark.png')} style={{ width: 30, height: 30, marginRight: 15 }} />
                              </Pressable>
                              <Pressable onPress={() => accept(false, parseInt(id, 10))}>
                                <Image source={require('../assets/cross.png')} style={{ width: 30, height: 30, marginLeft: 15 }} />
                              </Pressable>
                            </View>
                          </View>
                        );
                      }
                    })}
                  </>
                ) : (<Text style={{ ...styles.defaultText }}>Aucune candidature pour le moment.</Text> )
                }

                {props.passengers && props.passengers.length > 0 ? (
                  <>
                    <Text style={{ ...styles.defaultText, fontWeight: 'bold' }}>Passagers déjà validés :</Text>
                    {Object.values(props.passengers).map((value, key) => {
                      if (value) {
                        const [id, name] = value.split(':'); // Assurez-vous que `value` n'est pas `undefined`
                        return (
                          <View key={key} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.defaultText}>{name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                              <Pressable>
                                <Image source={require('../assets/cross.png')} style={{ width: 30, height: 30, marginLeft: 15 }} />
                              </Pressable>
                            </View>
                          </View>
                        );
                      }
                    })}
                  </>
                ) : props.content.type == "offer" && (
                  <Text style={{ ...styles.defaultText }}>Aucun passager validé pour le moment.</Text> 
                )}
                {props.content.conductor  && (
                          <>
                            <Text style = {{...styles.defaultText, fontWeight : 'bold'}}>Conducteur : </Text>
                            <View style = {{flexDirection : "row", justifyContent : "space-between"}}>                
                                <Text style = {styles.defaultText}>{props.content.conductor.split(':')[1]}</Text>
                                <View style = {{flexDirection : "row"}}>    
                                    <Pressable>
                                      <Image source = {require("../assets/cross.png")} style = {{width : 30, height : 30, marginLeft: 15}}/>
                                    </Pressable>
                                </View>
                            </View>
                          </>
                          )
                      }
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.destinations}>À {props.content.arrival}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  destinations: {
    fontSize: 20,
    padding: 5,
    color: '#000',
    fontWeight: 'bold',
  },
  defaultText: {
    fontSize: 14,
    padding: 5,
    color: '#000',
  },
  mainContainer: {
    color: '#111111',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    elevation: 5,
  },
  titleContainer: {
    backgroundColor: '#efefef',
    borderRadius: 10,
    padding: 10,
    fontSize: 20,
  },
  revealContainer: {
    padding: 10,
  },
});
