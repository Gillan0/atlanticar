import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import React from 'react';
import { useNavigation } from '@react-navigation/native';

/**
 * Widget that shows information about applications:
 *  - Applications to Offers
 *  - Applications to Requests
 * Provides navigation to detailed screens for each type of application.
 * @function ApplicationsInfo
 * @returns {JSX.Element} The applications info component.
 */
const ApplicationsInfo = (props) => {
    
    const navigation = useNavigation();

    const route = props.route;

    return (
        
        <View style={{ ...styles.welcomeContainer, padding: 10, flex: 1, borderRadius: 10, flexDirection: "row" }}>
            
            {/* Bullet point for visual indication */}
            <View>
                <View style={{ alignSelf: "center", top: 4, borderWidth: 5, borderColor: 'white', borderRadius: 10, width: 20, height: 20 }} />
            </View>
            
            <View style={{ flex: 1 }}>
    
                <View style={{ paddingLeft: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#fff" }}> Vos Candidatures </Text>
                </View>

                <View style={{ flex: 1, padding: 10 }}>

                    {/* Button for navigating to the "ApplicationsOffers" screen */}
                    <Pressable onPress={() => navigation.navigate("ApplicationsOffers")} style={styles.buttonContainer}>
                        
                        <View style={{ flexDirection: "row" }}>
                            <Image source={require("../assets/black_offer.png")} style={{ height: 22, width: 22, marginRight: 10 }} />
                            <Text style={styles.buttonText}>Aux Offres</Text>
                        </View>
                        
                    </Pressable>

                    {/* Button for navigating to the "ApplicationsRequests" screen */}
                    <Pressable onPress={() => navigation.navigate("ApplicationsRequests")} style={styles.buttonContainer}>
                        
                        <View style={{ flexDirection: "row" }}>
                            <Image source={require("../assets/black_request.png")} style={{ height: 22, width: 22, marginRight: 10 }} />
                            <Text style={styles.buttonText}>Aux Requêtes</Text>
                        </View>
                        
                    </Pressable>
                        
                </View>
                        
            </View>
                        
        </View>

    );

};


/**
 * Stylesheet for the ApplicationsInfo widget.
 */
const styles = StyleSheet.create({
    
    welcomeContainer: {
        margin: 10,
        padding: 5,
        borderRadius: 10,
        backgroundColor: "#00b8de",
        flex: 1,
    },
    
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    
    buttonContainer: {
        backgroundColor: "#fff",
        alignItems: "center",
        margin: 5,
        padding: 8,
        borderRadius: 10,
    }
    
});

export default ApplicationsInfo;
