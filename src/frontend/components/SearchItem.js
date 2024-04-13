import React, { useState } from 'react';
import { Platform, UIManager, Image, Pressable, TextInput, StyleSheet,  View, Text, LayoutAnimation } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SearchItem = props => {
    const [inputs, setInputs] = useState(['', '', '','', '']);
    const [display, setDisplay] = useState(false);

    const changeInputs = (text, index) => {
        const newInputs = [...inputs];
        newInputs[index] = text;
        setInputs(newInputs);
    };
    const toggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setDisplay(!display);
    };
    const pushButton = () => {
        toggle();
        console.log(inputs)
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
                        <Text style={styles.buttonText}>Valider</Text>
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
    },
})

export default SearchItem;