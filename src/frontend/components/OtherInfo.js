import { View, Image, StyleSheet, Text, Pressable, Alert } from "react-native";
import React from 'react';
import { useNavigation } from '@react-navigation/native';

/**
 * Displays the menu where you can access the notification screen and the log out button.
 * @returns {React.ReactElement} The OtherInfo component.
 */
const OtherInfo = () => {
    
    const navigation = useNavigation();
    
    /**
     * Handles log out procedure.
     */
    const handleLogOut = () => {
        // Resets the stack navigation
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });

        // Pop up message to user
        Alert.alert('Vous êtes déconnecté !', 'A la prochaine sur AtlantiCar !');
    }

    return (
        <>
            <View style={{ ...styles.welcomeContainer, padding: 10, flex: 1, borderRadius: 10, flexDirection: "row" }}>

                {/* Bullet Point */}
                <View>
                    <View style={{ alignSelf: "center", top: 4, borderWidth: 5, borderColor: 'white', borderRadius: 10, width: 20, height: 20 }} />
                </View>

                {/* Content */}
                <View style={{ flex: 1 }}>

                    {/* Title */}
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#fff" }}> Other </Text>
                    </View>

                    {/* Buttons */}
                    <View style={{ flex: 1, padding: 10 }}>    

                        {/* Notification Button */}
                        <Pressable onPress={() => navigation.navigate("Notifications")} style={styles.buttonContainer}>  
                            
                            <View style={{ flexDirection: "row" }}>
                                <Image source={require("../assets/bell.png")} style={{ height: 22, width: 22, marginRight: 10 }} />
                                <Text style={styles.buttonText}>Notifications</Text>
                            </View>
                            
                        </Pressable>

                        {/* Log Out Button */}
                        <Pressable onPress={handleLogOut} style={styles.buttonContainer}>  
                            
                            <View style={{ flexDirection: "row" }}>
                                <Image source={require("../assets/logo_deconnexion.png")} style={{ height: 22, width: 22, marginRight: 10 }} />
                                <Text style={styles.buttonText}>Log Out</Text>
                            </View>
                            
                        </Pressable>

                    </View>

                </View>

            </View>
        </>
    );
}


/**
 * Stylesheet for this component.
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

export default OtherInfo;
