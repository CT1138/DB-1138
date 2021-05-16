module.exports = {
    name: 'unban',
    description: "unban",
    async execute(discord, embedcolor, message, args) {

        if(!args[1]) {message.channel.send(`Incorrect usage.\n**Usage:** ${require('../config.js').prefix}unban @<user> [reason ...]`); return;}

        const id = (args[1]);
        let reason = "Pardoned";

        if (args[2]) reason = args.splice(2).join(" ");

        message.guild.members.unban(id).catch()


        const embed = new discord.MessageEmbed()
        .setTitle("Member Unbanned")
        .setDescription(`Reason: **${reason}**`)
        .setAuthor(`User ID: ${id}`)
        .setColor(embedcolor)

    let today = new Date()
    const warntime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    const datetimestamp = today.toISOString().split('T')[0];

    con.query(`SELECT * FROM banlist WHERE id = '${person.id}'`, (err, rows) => {

    con.query(`INSERT INTO banlist (id, username, reason, bannedby, bandate, bantime) VALUES (${person.id}, '${person.displayName}', 'Unban: ${reason}', '${message.member.displayName}', '${datetimestamp}', '${warntime}')`)
    })

    let ModLogs = require('../config.js').modLogsID
    let targetChannel = message.guild.channels.cache.get(ModLogs)
    if (targetChannel) targetChannel.send(embed)
    message.delete


    }
}