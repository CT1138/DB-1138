export const discord = require("discord.js");
export const Discord = require("discord.js");
export let botToken = require('./config.js').token;
export const client = new discord.Client({disableEveryone: true, partials: ["MESSAGE", "CHANNEL", "REACTION"]});
export const bot = new Discord.Client();
export const fs = require('fs');
export const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
export const BotVersion = require('./package.json').version;
export const {Client, RichEmbed} = require('discord.js');
export const name = require('./package.json').name;
export var embedcolor = require('./config').embedColor;
export var servername = require('./config').serverName;
export var prefix = require('./config').prefix;
export const ytdl = require('ytdl-core')
export const ytSearch = require('yt-search')
export const mysql = require('mysql')
export const blacklisted = require('./blacklistedwords.json').blacklistedwords
export const con = mysql.createConnection({
      host     : require('./config.js').host,
      port     : require('./config.js').port,
      user     : require('./config.js').user,
      password : require('./config.js').password,
      database : require('./config.js').database,
      });