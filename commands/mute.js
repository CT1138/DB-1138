module.exports = {
    name: 'mute',
    description: "mute",
    execute(discord, embedcolor, con, message, args) {
        let person = message.guild.member(message.mentions.users.first())
        if(!args[1]) {message.channel.send(`Incorrect usage.\n**Usage:** ${require('../config.js').prefix}mute @<user> [reason ...]`); return;}
        if(!person) {message.channel.send('That user is not on the server!'); return;}

        let role = message.guild.roles.cache.get(require('../config.js').mutedRoleID);

        if(!role) {
            message.channel.send('The **muted** role does not exist, please make one then try again.')
            return;
        }

        let reason = "Misconduct";

        if (args[2]) reason = args.splice(2).join(" ");

        person.roles.add(role);
        con.query(`SELECT * FROM mutedTF WHERE id = '${person.id}'`, (err, rows) => {
            if (err) throw err;
            let sql;
            if (rows.length < 1) {
                sql = `INSERT INTO mutedTF (id, yn) VALUES ('${message.author.id}', true)`
                con.query(sql)
            } else {
                let yn = rows[0].yn;
                sql = `UPDATE mutedTF SET yn = true WHERE id = '${message.author.id}'`
                con.query(sql)
            }})
        const embed = new discord.MessageEmbed()
        .setTitle("Member Muted")
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

    con.query(`SELECT * FROM mutelist WHERE id = '${person.id}'`, (err, rows) => {

    con.query(`INSERT INTO mutelist (id, username, reason, mutedby, mutedate, mutetime, timed) VALUES (${person.id}, '${person.displayName}', '${reason}', '${message.member.displayName}', '${datetimestamp}', '${warntime}', 'false')`)
    })

    let ModLogs = require('../config.js').modLogsID
    let targetChannel = message.guild.channels.cache.get(ModLogs)
    if (targetChannel) targetChannel.send(embed)
    message.delete
    }}