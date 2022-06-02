const { MessageEmbed, Message, Client } = require("discord.js")

module.exports.config = {
    name: "triggered",
    aliases: ['trigg'],
    cooldown: 10,
    group: "fun",
    usage: '.triggered',
    description: "Your triggered"
}
module.exports.run = async (client, message, args) => {
    let avatar = message.author.displayAvatarURL()
    const say = new MessageEmbed()
        .setColor('00FF00')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setImage(`https://pixel-api-production.up.railway.app/image/triggered/?image=${avatar}`)
    return message.channel.send({ embeds: [say] })
}  