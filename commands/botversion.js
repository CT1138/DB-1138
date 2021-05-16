module.exports = {
    name: 'botversion',
    description: "",
    execute(discord, embedcolor, BotVersion, message) {
        const Embed = new discord.MessageEmbed()
            .setColor(embedcolor)
            .setTitle('Bot Version')
            .setDescription(`I am running version __${BotVersion}__.`)
            .setFooter('Code written by <@752989978535002134>')
        message.channel.send(Embed)
        message.delete;
    }
}