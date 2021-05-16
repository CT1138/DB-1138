module.exports = {
    name: 'kick',
    description: "",
    execute(discord, servername, embedcolor, message, args) {

        let person = message.guild.member(message.mentions.users.first());

        if (!person || !args[2]) return message.channel.send(`Incorrect usage.\n**Usage:** ${require('../config.js').prefix}kick @<user> [reason ...]`);

        if (!person.kickable) return message.channel.send("This member can\'t be kicked.");

        if (!person.id === message.author.id) return message.channel.send("You cannot kick yourself.");



        let reason = "Misconduct";

        if (args[2]) reason = args.splice(2).join(" ");

        if (!person.user.bot) {
            person.send(`You have been kicked from ${servername} for **${reason}**.`);
            person.kick({
                reason: reason
            })


            const embed = new discord.MessageEmbed()
                .setTitle("Member Kicked")
                .setDescription(`Reason: **${reason}**`)
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

            let today = new Date()
            const warntime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
            const datetimestamp = today.toISOString().split('T')[0];
        
            con.query(`SELECT * FROM kicklist WHERE id = '${person.id}'`, (err, rows) => {
        
            con.query(`INSERT INTO kicklist (id, username, reason, kickedby, kickdate, kicktime) VALUES (${person.id}, '${person.displayName}', '${reason}', '${message.member.displayName}', '${datetimestamp}', '${warntime}')`)
            })

            let ModLogs = require('../config.js').modLogsID
            let targetChannel = message.guild.channels.cache.get(ModLogs)
            if (targetChannel) targetChannel.send(embed)
            message.delete;
        }
    }
}