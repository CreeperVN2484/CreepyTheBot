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
    const ip = args[0];
    const port = args[1];
    const nport = Number(`${port}`)

    if (!ip) {
        message.channel.send({ content: "No IP provided" })
    }

    if (!port) {
        message.channel.send({ content: "No port provided" })
    }

    if (nport === "NaN") {
        message.channel.send({ content: "Invalid port" })
    }

        const result = await util.statusBedrock(`${ip}`, port, options)

        let content = result

        const say = new MessageEmbed()
            .setColor('00FF00')
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
            .setTitle("**Server Found!**")
            .setDescription(`\nInfo:\nName: ${content.motd.clean}\n\Version: ${content.version.name}\nProtocol: ${content.version.protocol}\n\nCurrent Players: ${content.players.online}\nMaximum players: ${content.players.max}\n\nServerGUID: ${content.serverGUID}\nGamemode: ${content.gameMode}`)
        message.channel.send({ embeds: [say] })

}
