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

//On crée l'event du nouveau membre
client.on('guildMemberAdd', member=>{
    member.guild.defaultChannel.send(`Bienvenue sur le serveur, ${member} !`);

    //si vous recherchez a envoyer le message sur un channel spécial
    //vous devez faire ceci
    const channel = member.guild.channels.find('name', 'member-log');
    //Au cas où le serveur n'existerai pas
    if(!channel) return;
    //On envoie le message en le mentionnant 
    channel.send(`Bienvenue sur le serveur : ${member}`);
});

//on se connecte
client.login(token);
