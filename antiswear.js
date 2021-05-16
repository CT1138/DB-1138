import { client, blacklisted, Discord } from "./constants";

client.on(`message`, async message => {
        //Check for swears
        let foundInText = false;
        for (var i in blacklisted) {
            if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
        }
    
        //What to do if there are swears
        if (foundInText) {
            if (message.author.bot) return;
            message.delete();
            message.reply("watch your language!");
            const channel = message.guild.channels.cache.get(require('./config.js').modLogsID);
            const embed1 = new Discord.MessageEmbed()
                .setDescription(`<@${message.author.id}> has sworn in <#${message.channel.id}>:
    **${message.content}**`)
                .setColor(require('./config.js').embedColor)
                .setTimestamp();
            channel.send(embed1)
            return;
        }
})