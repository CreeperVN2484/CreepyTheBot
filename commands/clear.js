const { MessageEmbed, Message, Client } = require("discord.js")

module.exports.config = {
    name: "clear",
    aliases: ['cls'],
    cooldown: 0,
    group: "management",
    usage: '.clear <amount>',
    description: "Clear <amount> of messages in a channel"
}

module.exports.run = async (client, message, args) => {
    const amount = parseInt(args[0])
    if (message) {
        await message.delete()
    }

    const msg = await message.channel.fetch({ limit: amount })
    const { size } = msg

    msg.forEach((message) => message.delete())

    message.channel.send(`Deleted ${size} messages`)


}