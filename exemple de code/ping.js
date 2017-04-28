/**
 * Un bot de bienvenue quand un nouveau membre rejoins
*/


// On importe le client
const discord = require('discord.js');

//On crée l'instance
const client = new discord.Client();

//Le token de votre bot disponible sur : https://discordapp.com/developers/applications/me
const token = 'Votre_token-de-votr-bot';

//On a besoin de l'even *ready* pour qu'on vois s'il est connecté
client.on('ready', ()=>{
    console.dir('Je suis prêt');
});

//On va crée notre commande avec l'event message
client.on('message', message=>{
    //on utilise un if (si) qui va permettre de sélectionner la commande
    if(message.content.startsWith('ping')){
        message.reply('Pong : ' + client.ping); // ce type de message envoie une réponse en le mentionnant
    }
});

//on se connecte
client.login(token);
