const { MessageEmbed, Message, Client } = require("discord.js")
const fetch = require("node-fetch")
module.exports.config = {
    name: "8ball",
    aliases: ['8b'],
    cooldown: 10,
    group: "fun",
    usage: '.8ball',
    description: "The **+`Magic`** 8 Ball"
}
module.exports.run = async (client, message, args) => {
    let content = await fetch(`https://pixel-api-production.up.railway.app/fun/8ball`)
    ncontent = await content.json()

    const say = new MessageEmbed()
        .setColor('00FF00')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setDescription(`${ncontent.reply}`)
    return message.channel.send({ embeds: [say] })
}  