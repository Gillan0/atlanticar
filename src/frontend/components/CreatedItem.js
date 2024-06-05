import React, { useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet, Alert } from 'react-native';
import url from '../misc/url';
import { useNavigation, useRoute } from '@react-navigation/native';
import SHA256 from 'crypto-js/sha256';

/**
 * Component for displaying and managing created items.
 * @function CreatedItem
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} The created item component.
 */
export default function CreatedItem(props) {
  
    const navigation = useNavigation();
    const route = useRoute();

    const [candidates, setCandidates] = useState(props.candidates);
    const [passengers, setPassengers] = useState(props.passengers);
    const [conductor, setConductor] = useState(props.content.conductor);
    const [nbSeat, setNbSeat] = useState(props.content.nb_seat);

    const [showPhones, setShowPhones] = useState([...Array(passengers.length)].fill(false));
    const [showPhoneConductor, setShowPhoneConductor] = useState(false);

    const [render, setRender] = useState(true);

    /**
     * Function to change the display status of phone numbers.
     * @param {boolean} bool - The new display status.
     * @param {number} index - The index of the phone number to change.
     */
    function changePhonesDisplay(bool, index) {
      
        const newInputs = [...showPhones];
        newInputs[index] = bool;
      
        setShowPhones(newInputs);
    }


    /**
     * Function to accept or refuse a candidate.
     * @param {boolean} bool - Whether to accept or refuse the candidate.
     * @param {string} value_candidate - The candidate's value.
     * @param {number} key_candidate - The candidate's key.
     */
    function accept(bool, value_candidate, key_candidate) {
      
        const [id, name, phone] = value_candidate.split(':');
        const id_candidate = parseInt(id, 10);

        const dataToSend = {
            id: props.id,
            password: SHA256(props.password).toString(),
            command: props.content.type === 'offer' 
                ? (bool ? 'accept_application_offer' : 'refuse_application_offer') 
                : (bool ? 'accept_application_request' : 'refuse_application_request'),
        };

        if (bool) {
          
            dataToSend.parameters = props.content.type === 'offer' 
                ? [[id_candidate, props.content.id], [id_candidate, props.content.id, props.id], [props.content.id], [id_candidate, props.username]] 
                : [[id_candidate, props.content.id, props.id], [id_candidate, props.content.id], [id_candidate, props.username]];
          
        } else {
          
            dataToSend.parameters = props.content.type === 'offer' 
                ? [[id_candidate, props.content.id, props.id], [props.content.id], [id_candidate, props.username]] 
                : [[id_candidate, props.content.id, props.id], [id_candidate, props.username]];
          
        }

        if (conductor && props.content.type === 'request') {
          
            Alert.alert("Vous avez déjà un conducteur !", "Si vous souhaitez en changer, supprimez-le d'abord !");
            return;
        }

        if (nbSeat < 0 && props.content.type === 'offer') {
          
            Alert.alert("Il n'y a plus de places", "Si vous en voulez plus, allez dans les paramètres !");
            return;
          
        }

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
              
                Alert.alert(bool ? "Candidature validée !" : "Candidature refusée !", "Le candidat en a été informé !");
                let newCandidates = [...candidates];
                newCandidates.splice(key_candidate, 1);
                setCandidates(newCandidates);
              
                if (bool) {
                    if (props.content.type === "offer") {
                      
                        setPassengers([...passengers, value_candidate]);
                        setNbSeat(nbSeat - 1);
                      
                    } else if (props.content.type === "request") {
                      
                        setConductor(value_candidate);
                      
                    }
                  
                }
            } else {
              
                Alert.alert("Error", "No affected Rows");
              
            }
        })
          
        .catch((error) => console.error('Erreur :', error));
    }

  
    /**
     * Function to cancel a candidate.
     * @param {string} value_candidate - The candidate's value.
     * @param {number} key_candidate - The candidate's key.
     */
    function cancel(value_candidate, key_candidate) {
      
        const [id, name, phone] = value_candidate.split(':');
        const id_candidate = parseInt(id, 10);

        const dataToSend = {
            id: props.id,
            password: SHA256(props.password).toString(),
            command: props.content.type === 'offer' ? "cancel_passenger" : "cancel_conductor",
            parameters: props.content.type === 'offer' 
                ? [[props.content.id, id_candidate], [props.content.id], [id_candidate, props.username]] 
                : [[props.content.id], [id_candidate, props.username]],
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
                if (props.content.type === "offer") {
                    let newPassengers = [...passengers];
                    newPassengers.splice(key_candidate, 1);
                    setPassengers(newPassengers);
                    setNbSeat(nbSeat + 1);
                    Alert.alert("Passager supprimé !", "Ce dernier en a été informé");
                } else if (props.content.type === "request") {
                    setConductor(null);            
                    Alert.alert("Conducteur supprimé !", "Ce dernier en a été informé");
                }
            } else {
                Alert.alert("Error", "No affected Rows");
            }
        })
        .catch((error) => console.error('Erreur :', error));
    }

    /**
     * Function to delete the created item.
     */
    function del() {
      
        const dataToSend = {
            id: props.id,
            password: SHA256(props.password).toString(),
            command: props.content.type === 'offer' ? "delete_offer" : "delete_request",
            parameters: props.content.type === 'offer' ? [props.id, props.username, props.content.id, candidates, passengers] : [props.id, props.username, props.content.id, candidates, conductor],
        };

        // send of request with fetch
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
                setRender(!render);
            } else {
                Alert.alert("Error", "No affected Rows");
            }
        })
          
        .catch((error) => console.error('Erreur :', error));
    
    }

  
    return (
        <>
            {render ? 
                <View style={styles.mainContainer}>
              
                    <View style={{ ...styles.titleContainer }}>
  
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  
                            <Text style={{...styles.defaultText, fontWeight : 'bold'}}>PARAMETRES </Text>
  
                            <View style={{ flexDirection: 'row' }}>
  
                                <Pressable onPress={() => navigation.navigate("ModifyAnnouncement", { ...route.params, content: props.content })}>
                                    <Image source={require('../assets/parameters.png')} style={{ width: 30, height: 30, marginRight: 15 }} />
                                </Pressable>
  
                                <Pressable onPress={() => del()}>
                                    <Image source={require('../assets/bin.png')} style={{ width: 30, height: 30, marginLeft: 15 }} />
                                </Pressable>
  
                            </View>
  
                        </View>
  
                        <View style={{ flexDirection: 'row', flex: 1 }}>
  
                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ alignSelf: 'center', borderWidth: 4, borderColor: 'black', borderRadius: 10, width: 20, height: 20 }} />
                                <View style={{ alignSelf: 'center', height: candidates && candidates.length > 0 ? '85%' : '80%', borderWidth: 3, borderColor: 'black', borderStyle: 'dashed' }} />
                                <View style={{ alignSelf: 'center', borderWidth: 4, borderColor: 'black', borderRadius: 10, width: 20, height: 20 }} />
                            </View>
  
                            <View style={{ flexDirection: 'column', flex: 1 }}>
  
                                <Image source={props.content.type === 'offer' ? require("../assets/offer.png") : require("../assets/request.png")} style={{ height: 200, width: 200, right: 0, bottom: 0, position: "absolute" }} />
  
                                <Text style={styles.destinations}>De {props.content.departure}</Text>
  
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.defaultText}>Le {props.content.date.substring(8, 10)}/{props.content.date.substring(5, 7)}/{props.content.date.substring(2, 4)} à {props.content.date.substring(11, 13)}h{props.content.date.substring(14, 16)}</Text>
                                        {(props.content.type === "offer") ?
                                            <Text style={styles.defaultText}>{nbSeat} places restantes</Text>
                                            : <></>
                                        }
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.defaultText}>Prix affiché : </Text>
                                        <Text style={styles.defaultText}>{props.content.price} € </Text>
                                    </View>
                                    <View style={styles.revealContainer}>
                                        {props.content.comment && (
                                            <>
                                                <Text style={{ ...styles.defaultText, fontWeight: 'bold' }}>Infos supplémentaires affichées :</Text>
                                                <Text style={styles.defaultText}>{props.content.comment}</Text>
                                            </>
                                        )}

                                        {candidates && candidates.length > 0 ? (
                                            <>
                                                <Text style={{ ...styles.defaultText, fontWeight: 'bold' }}>Candidatures :</Text>
                                                {Object.values(candidates).map((value, key) => {
                                                    if (value) {
                                                      
                                                        const [id, name, phone] = value.split(':');
                                                      
                                                        return (
                                                            <View key={id} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                               
                                                                <Text style={styles.defaultText}>{name}</Text>
                                                                               
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <Pressable onPress={() => accept(true, value, key)}>
                                                                        <Image source={require('../assets/checkmark.png')} style={{ width: 30, height: 30, marginRight: 15 }} />
                                                                    </Pressable>
                                                                                               
                                                                    <Pressable onPress={() => accept(false, value, key)}>
                                                                        <Image source={require('../assets/cross.png')} style={{ width: 30, height: 30, marginLeft: 15 }} />
                                                                    </Pressable>
                                                                                               
                                                                </View>
                                                                                               
                                                            </View>
                                                                                               
                                                        );
                                                                          
                                                    }
                                                                                       
                                                })}
                                            </>
                                        ) : (<Text style={{ ...styles.defaultText, fontWeight:'bold'}}>Aucune candidature pour le moment.</Text> )}

                                        {passengers && passengers.length > 0 ? (
                                            <>
                                                <Text style={{ ...styles.defaultText, fontWeight: 'bold' }}>Passagers déjà validés :</Text>
                                                {Object.values(passengers).map((value, index) => {
                                                    if (value) {
                                                        const [id, name, phone] = value.split(':');
                                                        return (
                                                            <>
                                                                <View key={id} style={{ justifyContent: "flex-start", padding: 5 }}>
                                                                               
                                                                    <Text style={{ fontSize: 14 }}> Numéro de {name} : </Text>
                                                                               
                                                                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                                                                               
                                                                        <View style={{ flex: 0.50, justifyContent: "center" }}>
                                                                            <Text>  {showPhones[index] ? phone : "• •  ".repeat(5)}</Text>
                                                                        </View>
                                                                               
                                                                        <View style={{ flexDirection: "row", flex: 0.50, justifyContent: "space-between" }}>
                                                                               
                                                                            <Pressable onPress={() => changePhonesDisplay(!showPhones[index], index)}>
                                                                                <Image source={showPhones[index] ? require("../assets/eye_closed.png") : require("../assets/eye.png")} style={{ height: 30, width: 30 }} />
                                                                            </Pressable>
                                          
                                                                            <Pressable onPress={() => cancel(value, index)}>
                                                                                <Image source={require("../assets/cross.png")} style={{ height: 30, width: 30 }} />
                                                                            </Pressable>
                                          
                                                                        </View>
                                          
                                                                    </View>
                                          
                                                                </View>
                                          
                                                            </>
                                                        );
                                                    }
                                                })}
                                            </>
                                        ) : props.content.type === "offer" && (
                                            <Text style={{ ...styles.defaultText, fontWeight:'bold' }}>Aucun passager validé pour le moment.</Text> 
                                        )}

                                        {conductor && (
                                            <>
                                                <Text style={{ ...styles.defaultText, fontWeight: "bold" }}>Conducteur : </Text>
                                          
                                                <View style={{ justifyContent: "flex-start", padding: 5 }}>
                                          
                                                    <Text style={{ fontSize: 14 }}> Numéro de {conductor.split(':')[1]} : </Text>
                                          
                                                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                                          
                                                        <View style={{ flex: 0.50, justifyContent: "center" }}>
                                                            <Text>  {showPhoneConductor ? conductor.split(':')[2] : "• •  ".repeat(5)}</Text>
                                                        </View>
                                          
                                                        <View style={{ flexDirection: "row", flex: 0.50, justifyContent: "space-between" }}>
                                          
                                                            <Pressable onPress={() => setShowPhoneConductor(!showPhoneConductor)}>
                                                                <Image source={showPhoneConductor ? require("../assets/eye_closed.png") : require("../assets/eye.png")} style={{ height: 30, width: 30 }} />
                                                            </Pressable>
                                          
                                                            <Pressable onPress={() => cancel(conductor, 0)}>
                                                                <Image source={require("../assets/cross.png")} style={{ height: 30, width: 30 }} />
                                                            </Pressable>
                                          
                                                        </View>
                                          
                                                    </View>
                                          
                                                </View>
                                          
                                            </>
                                        )}
                                    </View>
                                          
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.destinations}>À {props.content.arrival}</Text>
                                    </View>
                                          
                                </View>
                                          
                            </View>
                                          
                        </View>
                                          
                    </View>
                                          
                </View>

                : null}
        </>
    );
}


/**
 * Stylesheet for the CreatedItem component.
 */
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
