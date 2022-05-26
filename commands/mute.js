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
    description: "Mute a user so they cannot type",
    usage: '.mute [@user] [time]',
    example: '.mute @Slayer 10m',
}

module.exports.run = async(client, message, args) => {
    const userInput = message.mentions.members.last() ? message.mentions.members.last() : args[0]

    let mm ;
    try {
    if (userInput === args[0]) mm = await message.guild.members.fetch(args[0]); else mm = await message.mentions.members.last();
    } catch {

    }
    if (!mm) return message.channel.send(client.noMember);

    if (mm.id === client.user.id) return message.channel.send(client.main);

     let muteRole = message.guild.roles.find(`name`, "Muted");
      if (!muteRole) {
        try {
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
      }
    }
    const time = args[1];
    if (!time) return message.channel.send(client.main);

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

const Muted = new MessageEmbed()
.setColor(client.color)
    .setDescription(`${client.success} _\`${mm.user.username}\` has been muted_ \n **WARNING: unmute havent been implement yet, use another bot to unmute or .mute @user 0 `)

    mm.roles.add(muteRole).then(() => {

        const userLogs = require('../database/userlogs.json')

    if (!userLogs[mm.id]) {
        userLogs[mm.id] = {};
        fs.writeFile('./database/userlogs.json', JSON.stringify(userLogs), (err) => {
 
        })
        if (!userLogs[mm.id][message.guild.id]) {
            userLogs[mm.id][message.guild.id] = {};
            fs.writeFile('./database/userlogs.json', JSON.stringify(userLogs), (err) => {
            
            })
        }
    }
 
    if (!userLogs[mm.id][message.guild.id].logs) {
        userLogs[mm.id][message.guild.id] = {
            logs: 0
        };
        fs.writeFile('./database/userlogs.json', JSON.stringify(userLogs), (err) => {
            
        })
    }
 
    userLogs[mm.id][message.guild.id].logs++
 
 
       fs.writeFile('./database/userlogs.json', JSON.stringify(userLogs), (err) => {
            
        })


        message.channel.send(Muted);
        setTimeout(() => {
            mm.roles.remove(muteRole)
        }, ms(time))
    })

}