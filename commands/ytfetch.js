const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports.config = {
    name: "ytfetch",
    aliases: ['yt'],
    cooldown: 10,
    group: "misc",
    usage: '.ytfetch',
    description: "Fetch for youtube videos"
}

module.exports.run = async (client, message, args) => {
    const nvideo = args.join(" ");
    const video = nvideo.replace(" ", "%20")
    if (!video) {
         message.channel.send("No video name provided")
    }

    let a = await fetch(`https://pixel-api-production.up.railway.app/data/youtube/?video=${video}`)
    content = await a.json()

    const say = new MessageEmbed()
        .setColor('00FF00')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setURL(`${content.video}`)
        .setTitle("**Video Found!**")
        .setDescription(`\nInfo:\nVideo: ${content.title}\nPosted By: ${content.author}\nChannel: ${content.channel}\nViews: ${content.views}\n\nDescription:\n${content.description}`)
        .setFooter(`content.thumbnail`)

    return message.channel.send(`${say}`"Click on the title to watch the video")
}
