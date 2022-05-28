const { MessageEmbed, Message, Client } = require("discord.js")

module.exports.config = {
    name: "weather",
    aliases: ['wtl'],
    cooldown: 100,
    group: "misc",
    usage: '.weather <country>',
    description: "Shows a country's weather"
}

module.exports.run = async (client, message, args) => {
    const command = args[0];
    if (!command) {
        return message.channel.send("Incorrect Args")
    }

    else {
        const pixel = require('pixel-api-wrapper')
            let content = await pixel.Weather(`${command}`)

        const say = new MessageEmbed()
             .setColor('008000')
            .setDescription(content)

        message.channel.send(say)
    }
}