const { MessageEmbed } = require("discord.js")

module.exports.config = {
    name: "settings",
    // aliases: ['settings'],
    group: 'management',
    description: "View all configuration settings",
    usage: '.config',
    example: '.config'
}

module.exports.run = async (client, message, args) => {

    let mRole = 'None';

    let muteRole = require('../database/muterole.json')[message.guild.id];
    if (muteRole) {
        mRole = `<@&${muteRole.role}>`
    }

    const em = new MessageEmbed()
        .setColor("0000FF")
        .setDescription(`Configuration settings for **${message.guild.name}** \n \n `)
        .addFields(
            {
                name: 'Mute role',
                value: mRole,
                inline: true
            },
            {
                name: 'Server prefix',
                value: '`' + serverPrefix + '`',
                inline: true
            }
        )

    message.channel.send({ embeds: [{ embeds: [em] }] })

}    