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
    const amount = args[0];
    if (message) {
        await message.delete()
    }

    const { size }  = await channel.bulkDelete(amount)
    message.channel.send(`Deleted ${size} messages`)


}