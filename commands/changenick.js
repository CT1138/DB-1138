module.exports = {
    name: 'changenick',
    description: "unmute",
    execute( discord, embedcolor, message, args) {
        let person = message.guild.member(message.mentions.users.first())
        if(!args[1]) {message.channel.send(`Incorrect usage.\n**Usage:** ${require('../config.js').prefix}changenick @<user> [reason ...]`); return;}
        if(!person) {message.channel.send('That user is not on the server!'); return;}

        let name = "Moderated Nickname";
        
        if (args[2]) name = args.splice(2).join(" ");
        if (name === 'reset') {
            person.setNickname(person.displayName);
            return;
        }
        person.setNickname(reason);
        const embed = new discord.MessageEmbed()
        .setTitle("Member Nickname Changed")
        .setDescription(`New Nickname: **${reason}**`)
        .setAuthor(message.member.displayName)
        .setColor(embedcolor)
        .setThumbnail(person.user.avatarURL())
        .addFields({
            name: 'Member',
            value: person.toString(),
            inline: true
        }, {
            name: 'Member ID',
            value: person.id,
            inline: true
        })
        .setTimestamp();

    let ModLogs = require('../config.js').modLogsID
    let targetChannel = message.guild.channels.cache.get(ModLogs)
    if (targetChannel) targetChannel.send(embed)
    message.delete

    }}