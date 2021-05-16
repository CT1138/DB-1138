module.exports = {
    name: 'ban',
    description: "",
    execute(discord, embedcolor, con, message, args) {

        let person = message.guild.member(message.mentions.users.first())
        if(!args[1]) {message.channel.send(`Incorrect usage.\n**Usage:** ${require('../config.js').prefix}ban @<user> [reason ...]`); return;}
        if(!person) {message.channel.send('That user is not on the server!'); return;}
        let reason = "Misconduct";
        if (args[2]) reason = args.splice(2).join(" ");
        person.ban({reason: reason})

        const embed = new discord.MessageEmbed()
        .setTitle("Member Banned")
        .setDescription(`Reason: **${reason}**`)
        .setAuthor(message.member.displayName)
        .setColor(embedcolor)
        .setThumbnail(person.user.avatarURL())
        .addFields({
            name: 'Member',
            value: person.toString(),
            inline: true
        })
        .setTimestamp();

    let today = new Date()
    const warntime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    const datetimestamp = today.toISOString().split('T')[0];

    con.query(`SELECT * FROM banlist WHERE id = '${person.id}'`, (err, rows) => {

    con.query(`INSERT INTO banlist (id, username, reason, bannedby, bandate, bantime) VALUES (${person.id}, '${person.displayName}', '${reason}', '${message.member.displayName}', '${datetimestamp}', '${warntime}')`)
    })

    let ModLogs = require('../config.js').modLogsID
    let targetChannel = message.guild.channels.cache.get(ModLogs)
    if (targetChannel) targetChannel.send(embed)
    }
}