module.exports = {
    name: 'suggest',
    description: "",
    execute(discord, embedcolor, blacklisted, message, args) {
        let foundInText = false;
        for (var i in blacklisted) {
            if(message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
        }
        if(foundInText) {
            return;
          }
        let suggestion = 'no suggestion specified';
        if (args[1]) {suggestion = args.splice(1).join(" ");} else {
            message.reply('You cannot submit an empty suggestion!');
            return;
        }
        let limit = 301;
        if (suggestion.length >= limit) {
            message.delete()
            message.reply('that suggestion is too long! Please shorten it to 300 characters or less.')
            return;
        }
        let targetChannel = message.guild.channels.cache.get(require('../config.js').suggestionsChannelID)
        const embed = new discord.MessageEmbed()
        .setTitle(`New suggestion from ${message.member.displayName}`)
        .setDescription(`**${suggestion}**`)
        .setThumbnail(message.author.avatarURL())
        .setColor(embedcolor)
        .setTimestamp()
        targetChannel.send(embed)
        message.reply('thank you for your suggestion! We will read it ASAP!')
}}