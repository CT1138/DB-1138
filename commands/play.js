const discord = require('discord.js')
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search')

const queue = new Map()

module.exports = {
    name: 'play',
    description: "",
    async execute(message, args, client) {

        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send('Please join a voice channel before executing this command!')

        const serverQueue = queue.get(message.guild.id);
        if (!args[1]) return message.channel.send('Please specify an action!')
        switch (args[1].toLowerCase()) {
            case "play":
                if (!args[2]) return message.channel.send('You need to provide a video to play!')
                let song = {}

                if (ytdl.validateURL(args[2])) {
                    const songInfo = await ytdl.getInfo(args[2])
                    song =  { title: songInfo.videoDetails, url: songInfo.videoDetails.video_url }
                } else {
                    const videoFinder = async query => {
                        const videoResult = await ytSearch(query)
                        return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                    }
                    const video = await videoFinder(args.join(' '))
                    if (video) {
                        song =  { title: video.title, url: video.url }
                    } else {
                        message.channel.send('Error finding video :(')
                    }
                }
                if (!serverQueue) {
                    const queueConstructor = {
                        voice_channel: voiceChannel,
                        text_channel: message.channel,
                        connection: null,
                        songs: []
                    }
                    queue.set(message.guild.id, queueConstructor)
                    queueConstructor.songs.push(song)
        
                    try {
                        const connection = await voiceChannel.join()
                        queueConstructor.connection = connection; 
                        video_player(message.guild, queueConstructor.songs[0]);
                        message.channel.send(`Now playing **${song.title}**`)
                        } catch (err) {
                            queue.delete(message.guild.id);
                            message.channel.send('There was an error connecting!');
                            throw err;
                        }
                } else {
                    serverQueue.songs.push(song)
                    return message.channel.send(`**${song.title}** added to queue!`)
                }
                break;

                case "skip":
                    skip_song(message, serverQueue);
                    break;

                case "stop":
                    stop_song(message, serverQueue);
                    break;
        }



    }
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id)

    if (!song) {
        queue.delete(guild.id)
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' })
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
    .on('finish', () => {
        song_queue.songs.shift()
        video_player(guild, song_queue.songs[0])
    })
}
const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`);
    }
    server_queue.connection.dispatcher.end();
    message.channel.send(`Skipping . . .`)
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}