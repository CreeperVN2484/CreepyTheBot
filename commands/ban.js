const { EmbedBuilder } = require("discord.js");
const fs = require('fs')
module.exports.config = {
    name: "ban",
    aliases: ['b'],
    usage: "ban [@user] <reason>",
    example: ".ban @Slayer Shitposting in chat",
    permissions: ['BAN_MEMBERS'],
    botperms: ['EMBED_LINKS', "KICK_MEMBERS"],
    group: "moderation",
    description: "Bans mentioned member",
    guildOnly: true
};

module.exports.run = async (client, message, args) => {
    const member = message.mentions.members.first() ? message.mentions.members.first() : args[0];

    if (!member) return message.channel.send({ embeds: [client.main] });

    const reason = args.slice(1).join(' ') ? args.slice(1).join(' ') : "No reason given"

    let mm;
    try {
        if (member === args[0]) {
            mm = await message.guild.members.fetch(args[0]);
        } else mm = await message.mentions.members.last();
    } catch {

    }

    if (!mm) return message.channel.send({ embeds: [client.noMember] });

    if (mm.id === client.user.id) return message.channel.send({ embeds: [client.main] })


    if (message.guild.members.cache.has(mm.id)) {
        if (mm.roles.highest.position > message.member.roles.highest) {
            if (message.member.id !== message.guild.ownerId) {
                return message.channel.send({ embeds: [client.higherRole] });
            }
        }
        if (mm.permissions.has('MANAGE_MESSAGES')) return message.channel.send({ embeds: [client.userstaff] });
    }

    message.guild.members.ban(mm.id, { reason: reason }).then(() => {

        const banned = new EmbedBuilder()
            .setColor('008000')
            .setDescription(`${client.success} _${mm.user.username} has been banned_`)
        message.channel.send({ embeds: [banned] });
    }).catch((e) => {
        console.log(e)
        const failed = new EmbedBuilder()
            .setColor('FF0000')
            .setDescription(`${client.fail} _Failed to ban ${mm.user.username}_`)

        message.channel.send({ embeds: [failed] });
    })
}  