import {client, con, prefix} from './constants.js'
client.on(`message`, async message => {
    if (message.content.startsWith(prefix)) return;
    if (message.author.bot) return;
        con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err, rows) => {
            if (err) throw err;
            let sql;
            if (rows.length < 1) {
                sql = `INSERT INTO xp (id, xp) VALUES ('${message.author.id}', 10)`
            } else {
                let xp = rows[0].xp;
                sql = `UPDATE xp SET xp = ${xp + 10} WHERE id = '${message.author.id}'`
            }
            con.query(sql)


        })

})