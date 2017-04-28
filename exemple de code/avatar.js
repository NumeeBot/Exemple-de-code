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
    if(message.content.startsWith('avatar')){
        message.channel.sendMessage({ //ce type de message ne mentionne pas et permet de manier le css (embed sur ce cas)
            embed:{
                title : 'Avatar', //C'est le titre
                image : {
                    url : message.author.avatarURL //on demande l'url de l'avatar de l'auteur du message
                }
            }
        });
    }
});

//on se connecte
client.login(token);
