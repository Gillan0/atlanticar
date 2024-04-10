const CreateOfferItem = props => {
    const [inputs, setInputs] = useState(['', '', '', '', '', '', '']);
  
    const changeInputs = (text, index) => {
      const newInputs = [...inputs];
      newInputs[index] = text;
      setInputs(newInputs);
    };
  
    const prompts = ["Départ : ",
                     "Arrivée : ", 
                     "Horaire : ", 
                     "Tarif (en €) : ", 
                     "Places occupées : ", 
                     "Nombre de places maximales : ",
                     "Commentaire :" ];
  
    function pushButton() {
      let isOfferValid = true;
      let errorMessage = "";
      for (i=0; i<6; i++) {
        if (inputs[i].trim() == "") {
          isOfferValid = false;
          errorMessage = errorMessage + "Le champ '" + prompts[i][0].toLowerCase() + prompts[i].substring(1,prompts[i].length - 3) +  "' est vide\n"
        }
  
      }
      if (isOfferValid) {
        props.addOffer(inputs);
        
        Alert.alert(title = "Offre créée !", message = "Un conducteur n'a plus qu'à l'accepter") 
        setInputs(['', '', '', '', '', '', ''])
      } else {
        Alert.alert(title = "Erreur !", message = errorMessage)    
      }
      return isOfferValid;
    }
  
    return (
  
    <RevealView title = "Créer Offre" style = {styles.createItemTitle} display = {false} buttonStyle = {{text : "Créer une Offre", function:pushButton, color:"#ddb500"}}>    
        <View style = {{backgroundColor : "#fff", borderRadius : 2, padding : 10}}>
          <View style = {{paddingBottom : 10}}>
          {prompts.map((value,index) => (
            <View style = {{flex : 1, flexDirection : "row"}}>
              <Text style = {{fontSize : 15, color : '#000000', alignSelf : "center"}} >{value}</Text>
              <TextInput style = {styles.input} onChangeText={(text) => changeInputs(text, index)}/>
            </View>
           ))}
          </View>
        </View>
    </RevealView>   
    
    
    )
  };

  export default CreateOfferItem;