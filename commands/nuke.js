const { Message } = require("discord.js")

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

    message.channel.clone().then((channel) => {
        channel.setPosition(message.channel.position)
        channel.setParent(message.channel.parent.id)
    })
    message.channel.delete()

    message.channel.send({ content: `Nuked by ${message.author.username}` })

}  