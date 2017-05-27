/**
 * Un bot Musique 
*/


// On importe le client
const discord = require('discord.js');

//On crée l'instance
const client = new discord.Client();

//Le token de votre bot disponible sur : https://discordapp.com/developers/applications/me
const token = 'Votre_token-de-votr-bot';

//Nous avons besoin de cette lib ppour lire la musique YouTube( => npm i --save ytdl-core)
const ytdl = require('ytdl-core');

//On a besoin de l'even *ready* pour qu'on vois s'il est connecté
client.on('ready', ()=>{
    console.dir('Je suis prêt');
});

//Maintenant commençons le bot musique 

//Element necessaire pour la playlist etc..
const connections = new Map();
let broadcast;

client.on('message', message =>{
  if (!message.guild) return;
  
  //Nous rejoingnons le channel vocal soit par le membre ou par un nom
  if (message.content.startsWith('+join')) {
    const channel = message.guild.channels.get(message.content.split(' ')[1]) || message.member.voiceChannel;
    if (channel && channel.type === 'voice') {
      channel.join().then(conn => {
        conn.player.on('error', (...e) => console.log('player', ...e));
        if (!connections.has(message.guild.id)) connections.set(message.guild.id, { conn, queue: [] });
        message.reply('Je suis connecté');
      });
    } else {
      message.reply('Spécifiez un Channel Vocal!');
    }
  }// Jouons une musique (necessite FFMPEG => npm install --save ffmpeg-binaries) ) 
  else if (message.content.startsWith('+play')) {
    if (connections.has(message.guild.id)) {
      const connData = connections.get(message.guild.id);
      const queue = connData.queue;
      const url = message.content.split(' ').slice(1).join(' ')
        .replace(/</g, '')
        .replace(/>/g, '');
      queue.push({ url, message });
      if (queue.length > 1) {
        message.reply(`Lancement dans ${queue.length - 1} musiques`);
        return;
      }
      doQueue(connData);
    }
  }  // musique suivante
  else if (message.content.startsWith('+skip')) {
    if (connections.has(message.guild.id)) {
      const connData = connections.get(message.guild.id);
      if (connData.dispatcher) {
        connData.dispatcher.end();
      }
    }
  } else if (message.content.startsWith('#eval') && message.author.id === 'Votre id') {
    try {
      const com = eval(message.content.split(' ').slice(1).join(' '));
      message.channel.sendMessage(`\`\`\`\n${com}\`\`\``);
    } catch (e) {
      console.log(e);
      message.channel.sendMessage(`\`\`\`\n${e}\`\`\``);
    }
  }
});
//Fonction musique
function doQueue(connData) {
  const conn = connData.conn;
  const queue = connData.queue;
  const item = queue[0];
  if (!item) return;
  const stream = ytdl(item.url, { filter: 'audioonly' }, { passes: 3 });
  const dispatcher = conn.playStream(stream);
  stream.on('info', info => {
    item.message.reply(`OK, Lancement de **${info.title}**`);
  });
  dispatcher.on('end', () => {
    queue.shift();
    doQueue(connData);
  });
  dispatcher.on('error', (...e) => console.log('dispatcher', ...e));
  connData.dispatcher = dispatcher;
}

});

//Démarrage du bot
client.login(token);
