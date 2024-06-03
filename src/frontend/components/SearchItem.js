import React, { useState } from 'react';
import { Platform, UIManager, Image, Pressable, TextInput, StyleSheet, View, Text, LayoutAnimation, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import isValidPrice from '../checkFunctions/isValidPrice';


if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}


/**
 * Component for displaying and managing a search item with filters.
 * @function SearchItem
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} The search item component.
 */
const SearchItem = (props) => {
    
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [inputs, setInputs] = useState(['', '', '']);
    const [display, setDisplay] = useState(false);

    /**
     * Handles date or time change.
     * @param {Event} event - The event object.
     * @param {Date} selectedDate - The selected date.
     */
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    /**
     * Displays the date or time picker.
     * @param {string} currentMode - The mode to display (date or time).
     */
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    /**
     * Displays the date picker.
     */
    const showDatepicker = () => {
        showMode('date');
    };

    /**
     * Displays the time picker.
     */
    const showTimepicker = () => {
        showMode('time');
    };

    /**
     * Resets the input fields and date.
     */
    const reset = () => {
        setInputs(['', '', '']);
        setDate(new Date());
        
        if (props.type === "request") {
            
            props.request("get_default_requests", 0, ['', '', '', '9999'], true);
            
        } else if (props.type === "offer") {
            
            props.request("get_default_offers", 0, ['', '', '', '9999'], true);
            
        }
    };

    /**
     * Updates the input fields.
     * @param {string} text - The input text.
     * @param {number} index - The index of the input field.
     */
    const changeInputs = (text, index) => {
        const newInputs = [...inputs];
        newInputs[index] = text;
        setInputs(newInputs);
    };

    /**
     * Toggles the display of the search filters.
     */
    const toggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setDisplay(!display);
    };

    /**
     * Handles the search button press.
     */
    const pushButton = () => {
        if (!isValidPrice(inputs[2])) {
            
            Alert.alert("Error!", "Invalid price");
            return;
            
        }
        
        let parameters = [];
        
        if (inputs[2] === '') {
            
            parameters = [inputs[0], inputs[1], date.toLocaleString("sv-SE"), '9999'];
            
        } else {
            
            parameters = [inputs[0], inputs[1], date.toLocaleString("sv-SE"), inputs[2]];
            
        }
        
        console.log(parameters);
        
        if (props.type === "request") {
            
            props.request("get_filter_requests", 0, parameters, true);
            
        } else if (props.type === "offer") {
            
            props.request("get_filter_offers", 0, parameters, true);
            
        }
        
        setInputs(['', '', '']);
    };
    
    return (
        
        <View style={styles.mainContainer}>
    
            <Pressable onPress={toggle} style={styles.titleContainer}>
                <Image source={require("../assets/loupe.png")} style={{ maxHeight: 30, maxWidth: 30 }} />
                <Text style={styles.titleText}> Rechercher </Text>
            </Pressable>

            {display && <View style={styles.revealContainer}>
                
                <View style={{ flexDirection: "row" }}>
                
                    <Text style={styles.text}>Departure: </Text>
                    <TextInput
                        value={inputs[0]}
                        style={styles.input}
                        onChangeText={(text) => changeInputs(text, 0)}
                    />
                            
                </View>
                            
                <View style={{ flexDirection: "row" }}>
                            
                    <Text style={styles.text}>Destination: </Text>
                    <TextInput
                        value={inputs[1]}
                        style={styles.input}
                        onChangeText={(text) => changeInputs(text, 1)}
                    />
                            
                </View>
                            
                <View style={{ flexDirection: "row" }}>
                            
                    <Text style={styles.text}>On </Text>
                            
                    <Pressable onPress={showDatepicker}>
                        <Text style={{ padding: 1, marginHorizontal: 2, borderRadius: 5, borderColor: "#000", borderWidth: 1, fontSize: 16 }}> {date.toLocaleDateString("fr-FR")} </Text>
                    </Pressable>
                            
                    <Text style={styles.text}> at </Text>
                            
                    <Pressable onPress={showTimepicker}>
                        <Text style={{ padding: 1, marginHorizontal: 2, borderRadius: 5, borderColor: "#000", borderWidth: 1, fontSize: 16 }}> {date.toLocaleTimeString("fr-FR").substring(0, 5)} </Text>
                    </Pressable>

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}
                                
                </View>
                                
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        
                    <View style={{ flexDirection: "row", flex: 1 }}>
                        
                        <Text style={styles.text}>For</Text>
                        
                        <TextInput
                            value={inputs[2]}
                            style={{ ...styles.input, maxWidth: 50 }}
                            onChangeText={(text) => changeInputs(text, 2)}
                        />
                            
                        <Text style={styles.text}>€</Text>
                            
                    </View>
                            
                    <Pressable onPress={pushButton} style={styles.button}>
                        <Text style={styles.buttonText}> Confirm </Text>
                    </Pressable>
                            
                    <Pressable onPress={reset} style={{ ...styles.button, backgroundColor: "#cc4400" }}>
                        <Text style={styles.buttonText}> Cancel </Text>
                    </Pressable>
                            
                </View>
                            
            </View>}
                            
        </View>
    );
};


/**
 * Stylesheet for the SearchItem component.
 */
const styles = StyleSheet.create({
    
    destinations: {
        backgroundColor: "#aaaaaa"
    },
    
    input: {
        maxHeight: 30,
        margin: 12,
        borderWidth: 1,
        padding: 5,
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 10,
        flex: 1
    },
    
    text: {
        maxHeight: 30,
        fontSize: 15,
        color: '#000000',
        alignSelf: "center"
    },
    
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: 'bold'
    },
    
    titleText: {
        color: "#ffffff",
        fontSize: 22,
        fontWeight: 'bold'
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
        flexDirection: "row",
        backgroundColor: "#a9a9a9",
        borderRadius: 10,
        padding: 5
    },
    
    revealContainer: {
        padding: 10,
        alignContent: "center"
    },
    
    button: {
        margin: 10,
        borderRadius: 10,
        padding: 5,
        backgroundColor: "#99cc33",
        elevation: 5
    },
    
});

export default SearchItem;
