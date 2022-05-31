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
    var amount = parseInt(args[0])

    if (!amount) return message.channel.send("No amount specified")
    if (amount > 100 || amount < 1) return message.channel.send("Invalid number! **Maximum 100**")

    message.channel.bulkDelete(amount).catch(err => {
        message.channel.send('Cannot delete messages older than 14 days!')
    })

    let msg = await message.channel.send(`Deleted \`${amount}\` messages`)
    setTimeout(() => {
        msg.delete()
    }, 2000)


}