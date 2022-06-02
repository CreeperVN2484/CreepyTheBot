const { Message, Client, MessageEmbed } = require("discord.js");

module.exports.config = {
    name: "lock",
    usage: "lock [#channel]",
    example: ".lock #lounge",
    permissions: ["MANAGE_CHANNELS"],
    botperms: ['EMBED_LINKS', "MANAGE_CHANNELS"],
    group: "moderation",
    description: "Locks a channel so no one can type",
    guildOnly: true
};

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async (client, message, args) => {
    const channel = message.mentions.channels.first() ? message.mentions.channels.first() : args[0];

    if (!channel) return message.channel.send({ embeds: [client.main] })

    let mm;

    if (channel === args[0]) mm = await message.guild.channels.cache.get(args[0]); else mm = await message.mentions.channels.first();

    mm.permissionOverwrites.edit(message.guild.roles.everyone.id, {
        SEND_MESSAGES: false
    }).then(() => {
        const done = new MessageEmbed()
            .setColor("00FF00")
            .setDescription(`${client.success} _**${mm.name}** has been locked_`)

        message.channel.send({ embeds: [done] })
    }).catch(() => {
        const failed = new MessageEmbed()
            .setColor("FF0000")
            .setDescription(`${client.fail} _Failed to lock **${mm.name}**_`)

        message.channel.send({ embeds: [failed] })
    })
};  