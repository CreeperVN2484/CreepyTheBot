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
        const say = new MessageEmbed()
            .setColor('00FF00')
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
            .setDescription(`Nuked by ${message.author.username}`)
            .setImage(`https://i.gifer.com/6Ip.gif`).
        message.channel.send(say)
        
    })
    message.channel.delete()

}