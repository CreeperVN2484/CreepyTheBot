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
        message.channel.send(`Nuked by ${message.author.username}`)
        const attachment = new Attachment('https://i.imgur.com/w3duR07.png');
        message.channel.send(attachment)
        
    })
    message.channel.delete()

}