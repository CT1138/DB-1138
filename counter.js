import {client, con} from './constants.js'

client.on(`message`, async message => {
    if (message.channel.id === require('./config.js').counterChannel) {
        con.query(`SELECT * FROM counter`, (err, rows) => {
            if(err) throw err;
            let number = rows[0].count;
            con.query("SELECT count FROM counter", async function (err, rows1) {
                
            if (message.content == number + 1) {
                con.query(`UPDATE counter SET count = count + 1`) 
            } else {
                if (!message.member.roles.cache.has(require('./config.js').staffRoleID)) {message.delete()}
            }
        })
        })
    }
    
})
