# atlantiCar

Projet CODEVSI de l'IMT Atlantique, le service de covoiturage de maintenant, de demain, d'après-demain et pas que !

# Use

Clone this repository
```
git clone https://github.com/napoknot21/atlantiCar.git
```

Enter to the cloned directory
```
cd atlantiCar
```

## Server

### Creation of the .env file

To run the back end of the application and for security reasons, you need to create an `.env` file where you will write sensitive information about your database permissions.

Given the project structure, create the `.env` file in the following path
```
./src/backend/
```
> Use the command `cd` to navigate !

An example of the file's content looks like this
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=napoknot21
DB_PASSWORD=MySecurePassword
DB_NAME=atlanticar
```
> Don't forget to adapt this information !

### Running the server

Then, run the ```server.js``` file
```
nodejs server.js
```
