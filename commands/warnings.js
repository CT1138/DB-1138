module.exports = {
    name: 'warnings',
    description: "help",
    execute(discord, embedcolor, con, message) {
        let target = message.mentions.users.first()
        if (!target) {
            const embed = new discord.MessageEmbed()
                .setTitle(`Incorrect usage.\n**Usage:** ${require('../config.js').prefix}warnings @<user>`)
                .setColor(embedcolor)
            message.channel.send(embed)
            return;
        }
        con.query(`SELECT * FROM warn WHERE id = '${target.id}'`, (err, rows) => {
            if (err) throw err;
            if (rows.length < 1) {
                const embed = new discord.MessageEmbed()
                    .setTitle('That user does not have any warns!')
                    .setColor(embedcolor)
                message.channel.send(embed)
            }

            const embed1 = new discord.MessageEmbed()
                .setDescription(`<@${target.id}>'s warnings:`)
                .setColor(embedcolor)

            let rowCount = rows.length;
            let i;
            for (i = 0; i < rowCount; i++) {
                let id1 = rows[i].id;
                let reason1 = rows[i].reason;
                let warnedby1 = rows[i].warnedby;
                let warndate1 = rows[i].warndate;
                let warntime1 = rows[i].warntime;

                embed1.addField('Warning #:', i + 1)
                embed1.addField('Reason:', reason1)
                embed1.addField('Warned By:', `${warnedby1}`)
                embed1.addField('Date:', warndate1)
                embed1.addField('Time:', warntime1)

            }
            message.channel.send(embed1)
        })
    }
}