const { MessageEmbed } = require("discord.js");

module.exports.config = {
    name: "unban",
    description: "Unban a banned user",
    usage: '.unban [ID]',
    botperms: ['BAN_MEMBERS'],
    permissions: ['BAN_MEMBERS'],
    group: 'moderation',
    example: '.unban 812420747136860241'
}

module.exports.run = async (client, message, args) => {
    const user_id = args[0];
    if (!user_id) return message.channel.send({ embeds: [client.main] });
    try {
        client.users.fetch(user_id)
    } catch {
        return message.channel.send({ embeds: [client.noUser] });
    }

    const mm = await client.users.fetch(user_id)

    message.guild.members.unban(user_id).then(() => {
        const unbanned = new MessageEmbed()
            .setColor("00FF00")
            .setDescription(`${client.success} _Successfully Unbanned ${mm.username}_`)
        message.channel.send({ embeds: [unbanned] });
    }).catch((e) => {
        //  console.log(e)
        const failed = new MessageEmbed()
            .setColor("FF0000")
            .setDescription(`${client.fail} _Failed to unban ${mm.username}_`)
        message.channel.send({ embeds: [failed] });
    })
}  