const { MessageEmbed, Message, Client } = require("discord.js")

module.exports.config = {
    name: "nuke",
    aliases: ['nk'],
    cooldown: 10,
    group: "management",
    usage: '.nuke',
    description: "Delete all message in the channel the command was used",
    permissions: ['MANAGE_CHANNELS']
}

module.exports.run = async (client, message, args) => {

    message.channel.clone().then(channel => {
        channel.setPosition(message.channel.position)
        message.channel.send({ content: `Channel nuked by ${message.author.username}\nhttps://i.gifer.com/6Ip.gif` })
    })
    message.channel.delete()

}  