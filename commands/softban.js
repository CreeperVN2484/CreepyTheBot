const { Client, Message, MessageEmbed } = require("discord.js");
const fs = require('fs')

module.exports.config = {
    name: "tempban",
    aliases: ['temp-ban'],
    group: 'moderation',
    description: "Tempban a user",
    usage: '.tempban [@user] <reason>',
    example: '.tempban @Slayer Spamming messages'
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async (client, message, args) => {
    const user = message.mentions.members.last() ? message.mentions.members.last() : args[0];

    if (!user) return message.channel.send({ embeds: [client.main] })

    let mm;
    try {
        if (user === args[0]) mm = await message.guild.members.fetch(args[0]); else mm = await message.mentions.members.last();
    } catch { }

    if (!mm) return message.channel.send({ embeds: [client.noMember] });

    if (mm.id === client.user.id) return message.channel.send({ embeds: [client.main] })

    const reason = args.slice(1).join(' ') ? args.slice(1).join(' ') : "No reason given";

    message.guild.members.ban(mm.id, { reason: reason, days: 7 }).then(() => {
        const softBanned = new MessageEmbed()
            .setColor("00FF00")
            .setDescription(`${client.success} _${mm.user.username} has been temp banned | ${reason}_`)
        message.channel.send({ embeds: [softBanned] });
    }).catch((e) => {
        console.log(e)
        const failed = new MessageEmbed()
            .setColor("FF0000")
            .setDescription(`${client.fail} _Failed to ban ${mm.user.username}_`)
        message.channel.send({ embeds: [failed] })
    })

}  