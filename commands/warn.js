module.exports = {
    name: 'warn',
    description: "ban",
    execute(discord, embedcolor, con, message, args) {

        let person = message.guild.member(message.mentions.users.first());

        if (!person) return message.channel.send('Please specify a user to warn!');

        if (person.id === message.author.id) return message.channel.send('You cannot warn yourself!');



        let reason = "Misconduct";

        if (args[2]) reason = args.splice(2).join(" ");

        if (!person.user.bot) {

            const embed = new discord.MessageEmbed()
                .setTitle("Member Warned")
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

            con.query(`SELECT * FROM warn WHERE id = '${person.id}'`, (err, rows) => {

            con.query(`INSERT INTO warn (id, reason, warnedby, warndate, warntime, username) VALUES (${person.id}, '${reason}', '${message.member.displayName}', '${datetimestamp}', '${warntime}', '${person.displayName}')`)
            })

            let ModLogs = require('../config.js').modLogsID
            let targetChannel = message.guild.channels.cache.get(ModLogs)
            if (targetChannel) targetChannel.send(embed)
            message.delete
                
        }
    }
}