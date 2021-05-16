module.exports = {
    name: 'xp',
    description: "help",
    execute(con, embedcolor, discord, message) {
        let target = message.mentions.users.first() || message.author;
        con.query(`SELECT * FROM xp WHERE id = '${target.id}'`, (err, rows) => {
            if(err) throw err;
            if (rows.length < 1) {
                const embed = new discord.MessageEmbed()
                .setTitle(`You have no xp! Send some messages to earn xp.`)
                .setColor(embedcolor)
                message.channel.send(embed);
                return;
            } else {
                let xp = rows[0].xp;
                const embed = new discord.MessageEmbed()
                .setTitle(`You have ${xp}XP!`)
                .setColor(embedcolor)
                message.channel.send(embed)
            }
        })
    }
}