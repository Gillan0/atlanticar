import React from 'react';
import { Platform, UIManager, Pressable, View, Text, Alert, Image, StyleSheet } from 'react-native';
import url from "../misc/url.js";


// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}


/**
 * Component for displaying and managing a request item.
 * @function RequestItem
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} The request item component.
 */
const RequestItem = (props) => {
    
    /**
     * Function to apply to a request.
     */
    function toCandidate() {
      
        const dataToSend = {
            id: props.account.id,
            password: props.account.password,
            command: "apply_to_request",
            parameters: [[props.account.id, props.request.id, props.request.author], [props.request.author, props.account.username]],
        };

        // Request options
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend) // Convert the data to JSON format
        };

        // Send the request with fetch
        fetch(url, requestOptions)
          
            .then(response => {
                if (!response.ok) {
                    Alert.alert("Connection Error", "Please check your connection");
                    throw new Error('Error in request.');
                }
                return response.json(); // Return the JSON data from the response
            })
          
            .then(data => {
                if (data[0].affectedRows == 0) {
                  
                    Alert.alert("Désolée !", "Vous avez déjà candidaté à cette requête ");
               
                } else {
                  
                    Alert.alert("Candidature envoyée !", "Le conducteur n'a plus qu'à confirmer !");
                
                }
            })
          
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
      
        <View style={styles.mainContainer}>
  
            <View style={styles.titleContainer}>
  
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.defaultText}>Par {props.request.user}</Text>
                    <Text style={styles.defaultText}>{props.request.price} €</Text>
                </View>

                <View style={{ flexDirection: "row", flex: 1 }}>
  
                    <View style={{ flexDirection: "column" }}>
                        <View style={{ alignSelf: "center", borderWidth: 4, borderColor: 'white', borderRadius: 10, width: 20, height: 20 }} />
                        <View style={{ alignSelf: "center", height: props.request.comment ? '85%' : '80%', width: 0, borderWidth: 3, borderColor: 'white', borderStyle: 'dashed' }} />
                        <View style={{ alignSelf: "center", borderWidth: 4, borderColor: 'white', borderRadius: 10, width: 20, height: 20 }} />
                    </View>
  
                    <View style={{ flexDirection: "column", flex: 1 }}>
  
                        <Image source={require("../assets/blue_request.png")} style={{ height: 200, width: 200, right: 0, bottom: 0, position: "absolute" }} />
  
                        <Text style={styles.destinations}>De {props.request.departure}</Text>
  
                        <View>
  
                            <View>
                                <Text style={styles.defaultText}>Le {props.request.date.substring(8, 10)}/{props.request.date.substring(5, 7)}/{props.request.date.substring(2, 4)} à {props.request.date.substring(11, 13)}h{props.request.date.substring(14, 16)}</Text>
                            </View>
  
                            <View style={styles.revealContainer}>
  
                                <View style={styles.commentContainer}>
  
                                    {props.request.comment && (
                                        <>
                                            <Text style={{ ...styles.defaultText, fontWeight: 'bold' }}>Infos supplémentaires:</Text>
                                            <Text style={styles.defaultText}>{props.request.comment}</Text>
                                        </>
                                    )}

                                    <View style={styles.buttonContainer}>
                                      
                                        <Pressable onPress={toCandidate} style={styles.button}>
                                            <Image source={require("../assets/flag.png")} style={{ height: 22, width: 22 }} />
                                            <Text style={styles.buttonText}> Candidater </Text>
                                        </Pressable>
                                      
                                    </View>
                                      
                                </View>
                                      
                            </View>
                                      
                        </View>
                                      
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.destinations}>à {props.request.arrival}</Text>
                        </View>
                                      
                    </View>
                                      
                </View>
                                      
            </View>
                                      
        </View>

    );

}


/**
 * Stylesheet for the RequestItem component.
 */
const styles = StyleSheet.create({
  
    destinations: {
        fontSize: 20,
        padding: 5,
        color: "#fff",
        fontWeight: "bold"
    },
  
    defaultText: {
        fontSize: 14,
        padding: 5,
        color: "#fff",
    },
  
    mainContainer: {
        backgroundColor: "#fff",
        color: "#111111",
        borderRadius: 10,
        margin: 10,
        shadowColor: "#000",
        elevation: 5,
    },
  
    titleContainer: {
        backgroundColor: "#00b8de",
        borderRadius: 10,
        padding: 10,
        fontSize: 20
    },
  
    revealContainer: {
        padding: 10,
    },
  
    button: {
        flexDirection: "row",
        alignSelf: "center",
    },
  
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: 'bold'
    },
  
    buttonContainer: {
        margin: 10,
        borderRadius: 10,
        padding: 7,
        backgroundColor: "#99cc33",
        shadowColor: "#000",
        elevation: 5,
        alignSelf: "center",
    }
  
});

export default RequestItem;
