import {client} from './constants.js'
//antispam
const AntiSpam = require('discord-anti-spam');
let antiSpam = new AntiSpam({
warnThreshold: 5, // Amount of messages sent in a row that will cause a warning.
maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
muteMessage: '**{user_tag}** has been muted for spamming.',// Message that will be sent in chat upon muting a user.
banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
maxDuplicatesWarning: 2, // Amount of duplicate messages that trigger a warning.
ignoredPermissions: ['ADMINISTRATOR'], // Bypass users with any of these permissions.
ignoreBots: true, // Ignore bot messages.
verbose: true, // Extended Logs from module.
ignoredMembers: [require('./config.js').staffRoleID], // Array of User IDs that get ignored.
muteRoleName: require('./config.js').mutedRoleName, // Name of the role that will be given to muted users!
removeMessages: true // If the bot should remove all the spam messages when taking action on a user!
// And many more options... See the documentation.
});
client.on('message', (message) => antiSpam.message(message));