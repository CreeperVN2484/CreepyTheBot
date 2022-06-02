const { MessageEmbed, Message, Client } = require("discord.js")
const fetch = require('node-fetch')

module.exports.config = {
    name: "joke",
    cooldown: 10,
    group: "fun",
    usage: '.joke',
    description: "Tell a joke"
}

module.exports.run = async (client, message, args) => {
    let content = await fetch(`https://pixel-api-production.up.railway.app/fun/joke`)
    content = await content.json()
    const say = new MessageEmbed()
        .setColor('00FF00')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setDescription(`${content.joke}`)
    return message.channel.send({ embeds: [say] })
}  