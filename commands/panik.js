const { MessageEmbed, Message, Client } = require("discord.js")

module.exports.config = {
    name: "panik",
    aliases: ['pk'],
    cooldown: 20,
    group: "fun",
    usage: '.panik <text> <text> <text>',
    description: "panik meme"
}

module.exports.run = async (client, message, args) => {
    const panik1 = args[0];
    const kalm = args[1];
    const panik2 = args[2];
    if (!panik1) {
        const say = new MessageEmbed()
            .setColor('FF0000')
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
            .setDescription("No text provided (Panik1)")
        return message.channel.send({ embeds: [say] })
    }
    if (!panik2) {
        const say = new MessageEmbed()
            .setColor('FF0000')
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
            .setDescription("No text provided (Panik2)")
        return message.channel.send({ embeds: [say] })
    }
    if (!kalm) {
        const say = new MessageEmbed()
            .setColor('FF0000')
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
            .setDescription("No text provided (Panik1)")
        return message.channel.send({ embeds: [say] })
    }
    else {
        npanik1 = panik1.replace(/\s/g, '%20')
        npanik2 = panik2.replace(/\s/g, '%20')
        nkalm = kalm.replace(/\s/g, '%20')

        const say = new MessageEmbed()
            .setColor('00FF00')
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
            .setImage(`https://pixel-api-production.up.railway.app/image/panik/?panik1=${npanik1}&kalm=${nkalm}&panik2=${npanik2}`)
        return message.channel.send({ embeds: [say] })
    }
}  