const ms = require('ms');
module.exports = {
        name: 'tempmute',
        description: "",
        execute(message, args) {

            let person = message.guild.member(message.mentions.users.first())
            let reason = 'Misconduct';
            let role = message.guild.roles.cache.get(require('../config.js').mutedRoleName);
            let role2 = message.guild.roles.cache.get(require('../config.js').memberRoleID)
            con.query(`SELECT * FROM mutedTF WHERE id = '${person.id}'`, (err, rows) => {
                if (err) throw err;
                let sql;
                if (rows.length < 1) {
                    sql = `INSERT INTO mutedTF (id, yn) VALUES ('${message.author.id}', true)`
                } else {
                    let xp = rows[0].xp;
                    sql = `UPDATE mutedTF SET yn = true WHERE id = '${message.author.id}'`
                }
                
                if (!args[1]) return message.channel.send('Please provide a member to mute.');
                if (!args[2]) {
                    message.channel.send('Please provide a duration!')
                    return;
                } else {
                    person.roles.add(role);
                    person.roles.remove(role2);
                    message.channel.send(`<@${person.id}> has been muted`);
                    setTimeout(function () {
                        person.roles.remove(role);
                        person.roles.add(role2)
                    }, ms(args[2]));
                }
                
                if (args[3]) reason = args.splice(3).join(" ");
                let today = new Date()
                const warntime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
                const datetimestamp = today.toISOString().split('T')[0];
                con.query(`SELECT * FROM mutelist WHERE id = '${person.id}'`, (err, rows) => {
                con.query(`INSERT INTO mutelist (id, username, reason, mutedby, mutedate, mutetime, timed) VALUES (${person.id}, '${person.displayName}', '${reason}', '${message.member.displayName}', '${datetimestamp}', '${warntime}', 'true')`)
                con.query(`SELECT * FROM mutedTF WHERE id = '${person.id}'`, (err, rows) => {
                    if (err) throw err;
                    let sql;
                    if (rows.length < 1) {
                        sql = `INSERT INTO mutedTF (id, yn) VALUES ('${message.author.id}', false)`
                        con.query(sql)
                    } else {
                        let xp = rows[0].xp;
                        sql = `UPDATE mutedTF SET yn = false WHERE id = '${message.author.id}'`
                        con.query(sql)
                    }})
            })
        })}}