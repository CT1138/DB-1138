import {
  botToken,
  client
} from './constants'

client.login(botToken);
client.on('ready', async () => {
  client.user.setActivity(require('./config.js').status, {type: require('./config.js').statusType});
  console.log('bot online!')
})

module.exports.db = require("./db.js")
module.exports.xp = require("./xp.js")
module.exports.counter = require('./counter.js')
module.exports.handler = require("./handler.js")
module.exports.welcome = require("./welcome.js")
module.exports.antispam = require("./antispam.js")
module.exports.antiswear = require("./antiswear.js")