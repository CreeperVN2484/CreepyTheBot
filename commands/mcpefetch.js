const { Message, Client, MessageEmbed } = require("discord.js");
const util = require('minecraft-server-util')

const options = {
    enableSRV: false
};

module.exports.config = {
    name: "mcpefetch",
    cooldown: 10,
    group: "misc",
    usage: '.mcpefetch <serverip> <serverport>',
    description: "Fetch for minecraft pe servers"
}

module.exports.run = async (client, message, args) => {
    const ip = agrs[0];
    const port = args[1];

    if (!ip) {
        message.channel.send({ content: "No IP provided" })
    }

    if (!port) {
        message.channel.send({ content: "No port provided" })
    }

    util.statusBedrock(`${ip}`, port, options)
        .then((result))
        .catch((error) => message.channel.send({ content: "Server not found" }));

    let content = result

    const say = new MessageEmbed()
        .setColor('00FF00')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setTitle("**Server Found!**")
        .setDescription(`\nInfo:\nName: ${content.motd.clean}\n\Version: ${content.version.name}\nProtocol: ${content.version.protocol}\n\nCurrent Players: ${content.players.online}\nMaximum players: ${content.player.max}\n\nServerGUID: ${content.serverGUID}\nGamemode: ${content.gameMode}`)
        .setImage(`${content.favicon_url}`)

    message.channel.send({ embeds: [say] })

}