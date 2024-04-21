import React, { useState } from 'react';
import { Platform, UIManager, Image, Pressable, TextInput, StyleSheet,  View, Text, LayoutAnimation, Alert} from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}


function changeDateFormat(dateString) {
    array = dateString.split('/');
    let formattedDate = ''
    for (let i = array.length; i> 0; i--) {
        formattedDate = formattedDate + array[i-1]
        if (i>1) {
            formattedDate = formattedDate + '-'
        }
    } 
    return formattedDate;
}
function isValidTimeFormat(str) {
    if (str == '') {
        return true;
    }
    const regex = /|(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (regex.test(str)) {
      const [hours, minutes] = str.split(':').map(Number);
      if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        return true;
      }
    }
    return false;
}
function isValidDateFormat(str) {
    // Expression régulière pour vérifier le format dd/mm/aaaa
    const regex = /^$|(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    
    // Test de la chaîne de caractères avec l'expression régulière
    return regex.test(str);
}
function isValidPrice(str) {
    if (str == '') {
        return true;
    }
    const num = parseFloat(str);
    return !isNaN(num);
}

const SearchItem = props => {
    const [inputs, setInputs] = useState(['', '', '','', '']);
    const [display, setDisplay] = useState(false);

    const changeInputs = (text, index) => {
        const newInputs = [...inputs];
        newInputs[index] = text.trim().toUpperCase(); 
        setInputs(newInputs);
    };
    const toggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setDisplay(!display);
    };
    const pushButton = () => {
        if (!isValidDateFormat(inputs[2])) {
            Alert.alert("Erreur !", "Jour invalide")
            return;
        }
        if (!isValidTimeFormat(inputs[3])) {
            Alert.alert("Erreur !", "Heure invalide")
            return;
        }
        if (!isValidPrice(inputs[4])) {
            Alert.alert("Erreur !", "Prix invalide")
            return;
        }
        toggle();
        let parameters = []
        if (inputs[4] == '') {            
            parameters = [inputs[0], inputs[1], changeDateFormat(inputs[2]) + ' ' + inputs[3], '9999']
        } else {
            parameters = [inputs[0], inputs[1], changeDateFormat(inputs[2]) + ' ' + inputs[3], inputs[4]]
        }
        if (props.type == "request") {
            props.request("get_filter_requests", parameters);
        } else if (props.type == "offer") {
            console.log("filter_offer")
            props.request("get_filter_offers", parameters);
        }
        setInputs(['','','','',''])
    };
    return (
        <View style={styles.mainContainer}>
            <Pressable onPress={toggle} style={styles.titleContainer}>
                <Image source={require("../assets/loupe.png")} style={{ maxHeight: 30, maxWidth: 30 }} />
                <Text style={styles.titleText}> Rechercher</Text>
            </Pressable>
            {display && <View style={styles.revealContainer}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Départ : </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => changeInputs(text, 0)}
                    />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Destination :</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => changeInputs(text, 1)}
                    />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text}>Le</Text>
                    <TextInput
                        style={{ ...styles.input, maxWidth: 110 }}
                        placeholder="DD/MM/AAAA"
                        onChangeText={(text) => changeInputs(text, 2)}
                    />
                    <Text style={styles.text}>à</Text>
                    <TextInput
                        style={{ ...styles.input, maxWidth: 65 }}
                        placeholder="HH:MM"
                        onChangeText={(text) => changeInputs(text, 3)}
                    />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <View style={{ flexDirection: "row", flex: 1 }}>
                        <Text style={styles.text}>Pour</Text>
                        <TextInput
                            style={{ ...styles.input, maxWidth: 50 }}
                            onChangeText={(text) => changeInputs(text, 4)}
                        />
                        <Text style={styles.text}>€</Text>
                    </View>
                    <Pressable onPress={pushButton} style={styles.button}>
                        <Text style={styles.buttonText}> Valider </Text>
                    </Pressable>
                </View>
            </View>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    destinations : {
        backgroundColor : "#aaaaaa"
    },
    input : {
        maxHeight: 30,
        margin: 12,
        borderWidth: 1,
        padding: 5,
        paddingLeft : 7,
        paddingRight : 7,
        borderRadius : 10,
        flex : 1
    },
    text : {
        maxHeight: 30,
        fontSize : 15,
        color : '#000000', 
        alignSelf : "center"
    },
    buttonText : {
        color : "#ffffff",
        fontSize : 18,
        fontWeight : 'bold'
    },
    titleText : {
        color : "#ffffff",
        fontSize : 22,
        fontWeight : 'bold'
    },
    mainContainer : {
        backgroundColor : "#fff",
        color : "#111111",
        borderRadius : 10,
        margin : 10,
        shadowColor: "#000",
        elevation: 5,
    },
    titleContainer : {
        flexDirection : "row",
        backgroundColor : "#a9a9a9", 
        borderRadius : 10, 
        padding : 5
    },
    revealContainer : {
      padding : 10,
      alignContent : "center"
    },
    button: {
        margin : 10,
        borderRadius: 10,
        padding: 5,
        backgroundColor: "#99cc33",
        elevation : 5
    },
})

export default SearchItem;