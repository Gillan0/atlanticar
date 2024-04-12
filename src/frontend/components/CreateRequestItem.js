const CreateRequestItem = props => {
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
  
    function addRequest() {
      let isRequestValid = true;
      let errorMessage = "";
      for (i=0; i<6; i++) {
        if (inputs[i].trim() == "") {
          isRequestValid = false;
          errorMessage = errorMessage + "Le champ '" + prompts[i][0].toLowerCase() + prompts[i].substring(1,prompts[i].length - 3) +  "' est vide\n"
        }
  
      }
      if (isRequestValid) {
        dataRequests.push({id : dataRequests.length, 
                    start : inputs[0], 
                    end : inputs[1], 
                    date : inputs[2], 
                    toPay : inputs[3],
                    occupiedPlaces : inputs[4],
                    totalPlaces : inputs[5],
                    comment : inputs[6]
      })
        Alert.alert(title = "Requête créée !", message = "Un conducteur n'a plus qu'à vous répondre") 
        setInputs(['', '', '', '', '', '', ''])
      } else {
        Alert.alert(title = "Erreur !", message = errorMessage)    
      }
      return isRequestValid;
    }
  
    return (
  
    <RevealView title = "Créer Requête" style = {styles.createItemTitle} display = {false} buttonStyle = {{text : "Créer une Requête", function:addRequest, color:"#ddb500"}}>    
      <View style = {{backgroundColor : "#fff", borderRadius : 2, padding : 10}}>
        <View style = {{paddingBottom : 10}}>
          {prompts.map((value,index) => (
            <View key = {index} style = {{flex : 1, flexDirection : "row"}}>
              <Text style = {{fontSize : 15, color : '#000000', alignSelf : "center"}} >{value}</Text>
              <TextInput style = {styles.input} onChangeText={(text) => changeInputs(text, index)}/>
            </View>
           ))}
        </View>
      </View>
    </RevealView>   
    
    
    )
  };