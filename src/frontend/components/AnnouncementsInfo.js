import {View, Image, StyleSheet, Text, Pressable} from "react-native";
import React from 'react';
import { useNavigation } from '@react-navigation/native';

/**
 * Widget that shows information about created announcements:
 *  - Offers
 *  - Requests
 * Provides navigation to detailed screens for each type of announcement.
 * @function AnnouncementsInfo
 * @returns {JSX.Element} The announcements info component.
 */
const AnnouncementsInfo = () => {
    
    const navigation = useNavigation();

    return (
        
        <View style={{ ...styles.welcomeContainer, padding: 10, flex: 1, borderRadius: 10, flexDirection: "row" }}>
    
            {/* Bullet point for visual indication */}
            <View>
                <View style={{ alignSelf: "center", top: 4, borderWidth: 5, borderColor: 'white', borderRadius: 10, width: 20, height: 20 }} />
            </View>
            
            <View style={{ flex: 1 }}>
    
                <View style={{ paddingLeft: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#fff" }}> Vos Annonces Créées </Text>
                </View>

                <View style={{ flex: 1, padding: 10 }}>
                   
                    {/* Button for navigating to the "AnnouncementsOffers" screen */}
                    <Pressable onPress={() => navigation.navigate("AnnouncementsOffers")} style={styles.buttonContainer}>
                        
                        <View style={{ flexDirection: "row" }}>
                            <Image source={require("../assets/black_offer.png")} style={{ height: 22, width: 22, marginRight: 10 }} />
                            <Text style={styles.buttonText}>Offres</Text>
                        </View>
                        
                    </Pressable>

                    {/* Button for navigating to the "AnnouncementsRequests" screen */}
                    <Pressable onPress={() => navigation.navigate("AnnouncementsRequests")} style={styles.buttonContainer}>
                        
                        <View style={{ flexDirection: "row" }}>
                            <Image source={require("../assets/black_request.png")} style={{ height: 22, width: 22, marginRight: 10 }} />
                            <Text style={styles.buttonText}>Requêtes</Text>
                        </View>
                        
                    </Pressable>
                        
                </View>
                        
            </View>
                        
        </View>

    );

};


/**
 * Stylesheet for the AnnouncementsInfo widget.
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

export default AnnouncementsInfo;
