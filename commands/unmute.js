const ms = require('ms')
const { Client, Message, MessageEmbed } = require('discord.js');
const fs = require('fs')

module.exports.config = {
    name: "mute",
    aliases: ['m'],
    permissions: ['MANAGE_MESSAGES'],
    guildOnly: true,
    group: 'moderation',
    botperms: ['EMBED_LINKS'],
    description: "Unmute a user",
    usage: '.mute [@user] [time]',
    example: '.mute @Slayer 10m',
}

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {*} args 
 */

module.exports.run = async (client, message, args) => {
    const userInput = message.mentions.members.last() ? message.mentions.members.last() : args[0]

    

    let mm
    try {
        if (userInput === args[0]) mm = await message.guild.members.fetch(args[0]); else mm = await message.mentions.members.last();
    } catch {

    } dsad
    if (!mm) return message.channel.send(client.noMember);

    if (mm.id === client.user.id) return message.channel.send(client.main);

    if (!require('../database/muterole.json')[message.guild.id]) {
        return message.channel.send(client.noMuteRole);
    }
    const time = args[1];
    if (!time) return message.channel.send(client.main);

    let muteRole = require('../database/muterole.json')[message.guild.id].role.toString();

    try {
        await message.guild.roles.fetch(muteRole)
    } catch {
        return message.channel.send(this.muteRoleInvalid)
    }
    let mRoleFetch = await message.guild.roles.fetch(muteRole);


    try {
        if (mRoleFetch.position >= message.guild.me.roles.highest.position) {
            return message.channel.send(client.roleHigherThanMe)
        }
    } catch {

    }

    const unmuted = new MessageEmbed()
        .setColor("00FF00")
        .setDescription(`${client.success} _\`${mm.user.username}\` has been unmuted_ `)

    mm.roles.remove(muteRole)

}