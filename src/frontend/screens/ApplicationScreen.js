import {View, StyleSheet, Text, Pressable, ScrollView, StatusBar, Button, Alert, TextInput, FlatList} from "react-native";
import React, {useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';


export default function ApplicationScreen({route}) {
    return (
      <View style = {{flex : 1, backgroundColor : "white"}}>
        <StatusBar backgroundColor="#99cc33"/>
        <ScrollView>
            <View>
                <Text> OUI </Text>
            </View>
        </ScrollView>
      </View>
    )
}