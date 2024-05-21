import {View, Image, StyleSheet, Text, Pressable, StatusBar, Alert, ScrollView} from "react-native";
import React from 'react';
import { useNavigation } from '@react-navigation/native';

// Composant pour une notification individuelle
export default NotificationItem = (props) => {
    return (
      <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
        <Text style={{ fontSize: 12, color: 'black' }}>Le {props.notification.date.substring(8,10)}/{props.notification.date.substring(5,7)}/{props.notification.date.substring(2,4)} à {props.notification.date.substring(11,13)}h{props.notification.date.substring(14,16)}</Text>
        <Text style={{ fontSize: 18, color: 'black' }}>{props.notification.message}</Text>
      </View>
    );
};