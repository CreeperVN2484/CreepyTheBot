const fetch = require('node-fetch')
const { MessageEmbed, Message, Client } = require("discord.js")

module.exports.config = {
    name: "delete",
    aliases: ['del'],
    cooldown: 20,
    group: "fun",
    usage: '.delete',
    description: "Delete.. but delete what?"
}
module.exports.run = async (client, message, args) => {
    let avatar = message.author.displayAvatarURL()
    const say = new MessageEmbed()
        .setColor('00FF00')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setDescription(`https://pixel-api-production.up.railway.app/image/trash/?image=${avatar}`)
    return message.channel.send(say)
}