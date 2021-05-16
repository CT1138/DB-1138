module.exports = {
    name: 'rng',
    description: "help",
    execute(message, args) {

        if(!args[1]){ return message.channel.send("Please provide a maximum number");}
        let max = args.splice(1).join(" ")
        let min = '1'
        const rng = Math.floor(Math.random() * (max - min) + min);
        message.channel.send(rng)

    }
}