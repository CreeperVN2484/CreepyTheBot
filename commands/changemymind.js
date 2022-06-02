const { MessageEmbed, Message, Client } = require("discord.js")

module.exports.config = {
    name: "changemymind",
    aliases: ['cmm'],
    cooldown: 20,
    group: "fun",
    usage: '.changemymind <text>',
    description: "Change My Mind meme"
}

module.exports.run = async (client, message, args) => {
    const text = args.join(" ");
    if (!text) {
        const say = new MessageEmbed()
            .setColor('FF0000')
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
            .setDescription("No text provided")
        return message.channel.send({ embeds: [say] })
    }
    else {
        let newtext = text.replace(/\s/g, '%20')
        const say = new MessageEmbed()
            .setColor('00FF00')
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
            .setImage(`https://pixel-api-production.up.railway.app/image/changemymind/?text=${newtext}`)
        return message.channel.send({ embeds: [say] })
    }
}