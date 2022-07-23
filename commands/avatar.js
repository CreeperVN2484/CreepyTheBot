const { EmbedBuilder } = require("discord.js")

module.exports.config = {
    name: "avatar",
    aliases: ['av'],
    cooldown: 5,
    group: "misc",
    usage: 'avatar <@user>',
    description: "Shows users avatar"
}

module.exports.run = async (client, message, args) => {
    const user = message.mentions.users.first() ? message.mentions.users.first() : args[0] ? args[0] : message.author

    if (user === args[0]) {
        try {
            let mm = await client.users.fetch(args[0]);

            const e = await new EmbedBuilder()
                .setColor('008000')
                .setDescription(`${mm.username}'s avatar!`)
                .setImage(mm.displayAvatarURL({ dynamic: true }))
            await message.channel.send({ embeds: [e] })
        } catch {
            message.reply({ embeds: [client.noMember] })
        }
    } else {

        const embed = new EmbedBuilder()
            .setColor('0000FF')
            .setDescription(`${user.username}'s avatar!`)
            .setImage(user.displayAvatarURL({ dynamic: true }))

        message.channel.send({ embeds: [embed] });
    };
}  