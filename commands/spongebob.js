
const { MessageEmbed, Message, Client } = require("discord.js")

module.exports.config = {
    name: "spongebob",
    aliases: ['sbb'],
    cooldown: 20,
    group: "fun",
    usage: '.spongebob <text>',
    description: "Spongebob burn paper meme"
}

module.exports.run = async (client, message, args) => {
    const text = args.join(" ");
    if (!text) {
        const say = new MessageEmbed()
            .setColor('FF0000')
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
            .setDescription("No text provided")
        return message.channel.send(say)
    }
    else {
        let newtext = text.replace(/\s/g, '%20')
        const say = new MessageEmbed()
            .setColor('00FF00')
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
            .setImage(`https://pixel-api-production.up.railway.app/image/spongebobburn/?text=${newtext}`)
        return message.channel.send(say)
    }
}