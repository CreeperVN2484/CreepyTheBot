const { MessageEmbed, Message, Client } = require("discord.js")

module.exports.config = {
    name: "credit",
    description: 'Credit to people who contributed on me',
    group: 'misc',
    usage: '.credit',
}

module.exports.run = async (client, message, args) => {
    const say = new MessageEmbed()
        .setColor('0000FF')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setDescription(`_**Special Thanks to these people**_:\nCreeperVN2484 (My owner)\nPixel (help fix my bugs and provider of the meme API)\nGithub (storage)\ndependacythebot (fix critical dependacy error even if it just a bot)\nHeroku (for being my host)\n\n_**Check these out!**_:\n\ngithub.com/PixelPasta\npixelpasta.github.io\ngithub.com/CreeperVN2484`)
    return message.channel.send({ embeds: [say] })
}  