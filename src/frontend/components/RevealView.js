import React, { useState } from 'react';
import { Platform, UIManager, Pressable, View, Text, Button, LayoutAnimation } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const RevealView = props => {
  const [display, setDisplay] = useState(false);

  function toggle() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDisplay(!display);
  };
  function pressButton() {
    let buttonPress = props.buttonStyle.function();
    if (buttonPress == true) {
      toggle();
    }
  }
  const displayColor = display ? props.style.colorActiveTitle : props.style.colorInactiveTitle;

  return (
    <View style={{ margin: props.style.margin, shadowColor: "#000", elevation: 5, backgroundColor : props.style.childrenBackgroundColor, justifyContent: "center" , borderRadius : 10}}>

      <Pressable onPress={toggle}>
        <View style={{ backgroundColor: displayColor, padding: props.style.titlePadding, borderRadius: props.style.titleBorderRadius }}>
          <Text style={{ fontSize: props.style.titleSize, color: props.style.titleColor, alignSelf: "center" }}>{props.title} </Text>
        </View>
      </Pressable>

      {display && (
        <View style={{
          alignSelf: "stretch",
          backgroundColor: props.style.childrenBackgroundColor,
          borderRadius: props.style.childrenBorderRadius,
          padding: props.style.childrenPadding,
        }}>
          {props.children}
          <Button title = {props.buttonStyle.text} onPress= {pressButton} color={props.buttonStyle.color}/>
        </View>
      )}
    </View>
  );
};

export default RevealView;

