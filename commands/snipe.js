const { MessageEmbed } = require("discord.js");

module.exports.config = {
    name: "snipe",
    group: 'misc',
    botpermissions: ['EMBED_LINKS'],
    usage: `.snipe`,
    example: `.snipe`,
    description: "Gets most recent deleted message",
    guildOnly: true
}

module.exports.run = async (client, message, args) => {
    const msg = await client.snipes.get(message.channel.id);
    if (!msg) return message.channel.send({ embeds: [client.noSnipes] });

    const embed = new MessageEmbed()
        .setColor("0000FF")
        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        .setDescription(msg.content)
        .setTimestamp()

    message.channel.send({ embeds: [embed] });
}  