const fetch = require('node-fetch')
const { MessageEmbed, Message, Client } = require("discord.js")

module.exports.config = {
    name: "fact",
    aliases: ['fac'],
    cooldown: 20,
    group: "fun",
    usage: '.fact',
    description: "Lots and Lots of random fact .Even in r/techniciallythetruth!"
}
module.exports.run = async (client, message, args) => {
    let content = await fetch(`https://pixel-api-production.up.railway.app/fact`)
    content = await content.json()
    const say = new MessageEmbed()
        .setColor('00FF00')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setDescription(`${content.fact}`)
    return message.channel.send({ embeds: [say] })
}  