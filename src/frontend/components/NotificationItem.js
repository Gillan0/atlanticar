import { View, Image, StyleSheet, Text, Pressable, StatusBar, Alert, ScrollView } from "react-native";
import React from 'react';
import { useNavigation } from '@react-navigation/native';

/**
 * Component to display a single notification item.
 * @function NotificationItem
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} The notification item component.
 */
export default function NotificationItem(props) {
    
    return (
        
        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>

            {/* Display the date and time of the notification */}
            <Text style={{ fontSize: 12, color: 'black' }}>
                Le {props.notification.date.substring(8, 10)}/{props.notification.date.substring(5, 7)}/{props.notification.date.substring(2, 4)} à {props.notification.date.substring(11, 13)}h{props.notification.date.substring(14, 16)}
            </Text>

            {/* Display the notification message */}
            <Text style={{ fontSize: 18, color: 'black' }}>
                {props.notification.message}
            </Text>
                
        </View>

    );

};
