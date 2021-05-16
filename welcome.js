import {
  client
} from './constants'

let msgchannel = require('./config.js').joinMessageChannelID
client.on('guildMemberAdd', (member) => {
    let role = require('./config.js').memberRoleID;
    member.roles.add(role);
    let channel = member.guild.channels.cache.get(msgchannel)
    channel.send(`<@${member.id}> has joined the server.`)
  })
  client.on('guildMemberRemove', (member) => {
    let channel = member.guild.channels.cache.get(msgchannel)
    channel.send(`${member} has left the server.`)
  })
  