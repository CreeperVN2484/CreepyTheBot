const fs = require('fs')
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports.config = {
    name: 'nickname',
    aliases: ['setnickname', 'set-nickname'],
    description: "Set the nickname of a user",
    usage: '.nickname [@user] [nickname]',
    example: '.nickname @Slayer Best coder ever',
    group: 'moderation'
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async function (client, message, args) {
    const member = message.mentions.members.last() ? message.mentions.members.last() : args[0];

    let mm;
    try {
        if (member === args[0]) mm = await message.guild.members.fetch(args[0]); else mm = await message.mentions.members.last();
    } catch { }

    if (!mm) return message.channel.send({ embeds: [client.noMember] });

    if (mm.id === client.user.id) return message.channel.send({ embeds: [client.main] });

    const nickName = args.slice(1).join(' ');
    if (!nickName) return message.channel.send({ embeds: [client.main] });

    if (!mm.manageable) {
        return message.channel.send({ embeds: [client.roleHigher] });
    }

    mm.setNickname(nickName).then(() => {
        const changed = new MessageEmbed()
            .setColor("00FF00")
            .setDescription(`${client.success} _${mm.user.username} nickname is now ${nickName}_`)

        message.channel.send({ embeds: [changed] });

    }).catch(() => {
        const failed = new MessageEmbed()
            .setColor("FF0000")
            .setDescription(`${client.fail} _Failed to change members nickname_`)

        message.channel.send({ embeds: [failed] });
    })


};  