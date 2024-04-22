const CreateRequestItem = props => {
    const [inputs, setInputs] = useState(['', '', '']);
  
    const changeInputs = (text, index) => {
      const newInputs = [...inputs];
      newInputs[index] = text;
      setInputs(newInputs);
    };

    const prompts = ["Nom d'utilisateur", 
                     "Mot de passe",
                     "phone"];
    
    function addRequest() {
        let isRequestValid = true;
        let errorMessage = "";
        for (i=0; i<3; i++) {
            if (inputs[i].trim() == "") {
                isRequestValid = false;
                errorMessage = errorMessage + "Le champ '" + prompts[i][0].toLowerCase() + prompts[i].substring(1,prompts[i].length - 3) +  "' est vide\n"
            }
        }

        if (isRequestValid) {
            dataRequests.push({id : dataRequests.length, 
                user : inputs[0], 
                password : inputs[1], 
                phone : inputs[2]
        })
            Alert.alert(title = "Compte crée !", message = "Votre est bien crée ! Bienvenue !") 
            setInputs(['', '', ''])
        } else {
            Alert.alert(title = "Erreur !", message = errorMessage)    
        }
        return isRequestValid;
    }

}

