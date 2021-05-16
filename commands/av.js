module.exports = {
    name: 'av',
    execute(Discord, embedcolor, message) {

        let person = message.mentions.users.first() || message.author;
    
            const embed = new Discord.MessageEmbed()
            .setTitle(`${person.username}'s Avatar:`)
            .setImage(person.avatarURL())
            .setColor(embedcolor)
            message.channel.send(embed)
            
    }
}