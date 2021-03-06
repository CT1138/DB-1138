import * as variable from './constants'

//Make the bot.commands thingy
variable.client.commands = new variable.Discord.Collection();
for (const file of variable.commandFiles) {
    const command = require(`./commands/${file}`);
    variable.client.commands.set(command.name, command)
}

//Listen for messages
variable.client.on(`message`, async message => {

    //Check if the message author is a bot, or if the message does not start with the prefix
    if (message.author.bot || !message.content.startsWith(variable.prefix)) return;
    if (!message.channel.id === require('./config.js').botCommandsChannelID) {
        message.channel.send(`Bot commands can only be used in <#${require('./config.js').botCommandsChannelID}>!`);
        return;
    }

try {
       //Command handler:
       let args = message.content.slice(variable.prefix.length).split(/ +/g);
       switch (args[0].toLowerCase()) {

           case "rps":
               variable.client.commands.get('rps').execute(message, args)
               break;

           case "av":
               variable.client.commands.get('av').execute(variable.discord, variable.embedcolor, message, args)
               break;

           case "ticket":
               variable.client.commands.get('ticket').execute(variable.con, variable.embedcolor, variable.Discord, variable.client, message)
               break;

           case "botversion":
               variable.client.commands.get('botversion').execute(variable.discord, variable.embedcolor, variable.BotVersion, message)
               break;

           case "xp":
               variable.client.commands.get('xp').execute(variable.con, variable.embedcolor, variable.discord, message)
               break;

           case "music":
               variable.client.commands.get('play').execute(message, args, variable.client)
               break;

           case "rng":
               variable.client.commands.get('rng').execute(message, args)
               break;

           case "slowmode":
               if (require('./config.js').staffRoleID) {
                   if (!args[1]) return message.channel.send('Set slowmode to **x** seconds!')
                   message.channel.setRateLimitPerUser(args[1] , "slowmode changed")
               } else {
                   message.channel.send(cmdDenied)
               }
               break;

           case "suggest":
                   variable.client.commands.get('suggest').execute(variable.discord, variable.embedcolor, variable.blacklisted, message, args);
               break;

           case "unban":
               if (require('./config.js').staffRoleID) {
                   variable.client.commands.get('unban').execute(variable.discord, variable.embedcolor, message, args, variable.con)
               } else {
                   message.channel.send(cmdDenied)
               }
               break;

           case "kick":
               if (require('./config.js').staffRoleID) {
                   variable.client.commands.get('kick').execute(variable.discord, variable.servername, variable.embedcolor, message, args)
               } else {
                   message.channel.send(cmdDenied)
               }
               break;

           case "changenick":
               if (require('./config.js').staffRoleID) {
                   variable.client.commands.get('changenick').execute(variable.discord, variable.embedcolor, message, args)
               } else {
                   message.channel.send(cmdDenied)
               }
               break;

           case "warn":
               if (require('./config.js').staffRoleID) {
                   variable.client.commands.get('warn').execute(variable.discord, variable.embedcolor, variable.con, message, args)
               } else {
                   message.channel.send(cmdDenied)
               }
               break;

           case "warnings":
               if (require('./config.js').staffRoleID) {
                   variable.client.commands.get('warnings').execute(variable.discord, variable.embedcolor, variable.con, message)
               } else {
                   message.channel.send(cmdDenied)
               }
               break;

           case "ban":
               if (require('./config.js').staffRoleID) {
                   variable.client.commands.get('ban').execute(variable.discord, variable.embedcolor, variable.con, message, args)
               } else {
                   message.channel.send(cmdDenied)
               }
               break;

           case "mute":
               if (require('./config.js').staffRoleID) {
                   variable.client.commands.get('mute').execute(variable.discord, variable.embedcolor, variable.con, message, args)
               } else {
                   message.channel.send(cmdDenied)
               }
               break;

           case "tempmute":
               if (require('./config.js').staffRoleID) {
                   variable.client.commands.get('tempmute').execute(message, args)
               } else {
                   message.channel.send(cmdDenied)
               }
               break;

           case "unmute":
               if (require('./config.js').staffRoleID) {
                   variable.client.commands.get('unmute').execute(variable.discord, variable.embedcolor, message, args, variable.con)
               } else {
                   message.channel.send(cmdDenied)
               }
               break;

           default:
               message.channel.send('Unknown command, see **-help** for a list of current commands.')
               break;

   }
} catch(err) {
    message.reply('There was an error executing this command :(')
}
 
});