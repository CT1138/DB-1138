const registerEvent = bot => {
    if (registered) return;
    registered = true;
    console.log('Registering events')

    bot.on('messageReactionAdd', (reaction, user) => {
        if(user.bot) return;
        console.log('Handling Reaction')
        const { message } = reaction

            message.channel.setParent(require('../config.js').ticketsChannelCategoryID)
            message.channel.overwritePermissions([
                {
                    id: user.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: message.guild.id, 
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: require('../config.js').staffRoleID,
                    allow: ['VIEW_CHANNEL']
                },
            ]);
    })
}

module.exports = {
    
    name: 'ticket',
    description: "help",
    execute(con, embedcolor, Discord, client, userMessage) {
        let registered = false;
        const { guild, member } = userMessage;

        registerEvent(client)
        const yes = userMessage.guild.emojis.cache.find(emoji => emoji.name === require('../config.js').ticketCloseEmojiName)
        
        con.query(`SELECT * FROM ticketData WHERE memberID = '${userMessage.author.id}'`, (err, rows) => {
            if (err) throw err;
            let sql;
            if (rows.length < 1) {
                sql = `INSERT INTO ticketData (memberID, ticketCount) VALUES ('${userMessage.author.id}', 1)`
            } else {
                if (rows.length >= 4) {userMessage.channel.send('You already have 3 tickets open.'); return;}
                let count = rows[0].ticketCount;
                sql = `UPDATE ticketData SET ticketCount = ${count + 1} WHERE memberID = '${userMessage.author.id}'`
            }})
            con.query(sql)

        con.query(`UPDATE ticketId SET count = count + 1`) 

        setTimeout(function(){ 
        con.query(`SELECT * FROM ticketId`, (err, rows) => {
        if(err) throw err;
        let number = rows[0].count;
        guild.channels.create(`ticket-${number}`, {
            type: 'text',
            parent: require('../config.js').ticketsChannelCategoryID,
            permissionOverwrites: [
                {
                    id: userMessage.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: userMessage.author.id,
                    allow: ['VIEW_CHANNEL'],
                },
                {
                    id: require('../config.js').staffRoleID,
                    allow: ['VIEW_CHANNEL'],
                },
            ],
        }).then(async channel => {
            const embed = new Discord.MessageEmbed()
              .setTitle('Ticket')
              .setDescription(`:wave: Welcome to your ticket, ${userMessage.author.username}!\nWhen your problem has been resolved, please react to this message with a checkmark.`)
              .setColor(embedcolor)
            channel.send('<@' + userMessage.author.id + `> <@${require('../config.js').staffRoleID}>`)
            channel.send(embed).then((ticketMessage) => {
                ticketMessage.react(yes)
            })
        })
        })
        }, 500);
    }
}