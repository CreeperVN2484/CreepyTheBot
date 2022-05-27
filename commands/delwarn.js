const { MessageEmbed } = require('discord.js');

module.exports.config = {
    name: "delwarn",
    description: "Delete a warning from a user",
    group: 'moderation',
    usage: '.delwarn [@user] <amount>',
    permissions: ['MANAGE_MESSAGES'],
}

module.exports.run = async(client, message, args) =>{
    const user = message.mentions.users.last() ? message.mentions.users.last() : args[0];

    if (!user) return message.channel.send(client.main);

    let amount = args[1];

    if (!amount) amount = 1;

    let mm;
    try {
    if (user === args[0]) mm = await message.guild.members.fetch(args[0]); else mm = await message.mentions.members.last();
    } catch { };

    if (!mm) return message.channel.send(client.noMember);

    if (!message.member.hasPermission("MANAGE_GUILD")) {

    if (mm.id === message.author.id) return message.channel.send(client.cantDelOwnWarn)
    }

    const warns  = require('../database/warns.json');

    if (!warns[mm.id]) {
        if (!warns[mm.id][message.guild.id]) return message.channel.send(client.userNoWarns);
        return message.channel.send(client.userNoWarns);
        
    };

    if (isNaN(amount)) return message.channel.send(client.amountNum)


    warns[mm.id][message.guild.id].warns -= amount;

    const delWarned = new MessageEmbed()
        .setColor("00FF00")
    .setDescription(`${client.success} Deleted \`${amount}\` warnings`)

    message.channel.send(delWarned);

}