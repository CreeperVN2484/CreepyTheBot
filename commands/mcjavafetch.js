const { Message, MessageEmbed } = require("discord.js");
const fetch = require('node-fetch')

module.exports.config = {
    name: "mcjavafetch",
    cooldown: 10,
    group: "misc",
    usage: '.mcjavafetch <serverip>',
    description: "Fetch for minecraft servers (java 1.7.2+ only)"
}

module.exports.run = async (client, message, args) => {

    const ip = args[0];
    if (!ip) {
        message.channel.send({ content: "No IP provided" })
    }

    let a = await fetch(`https://pixel-api-production.up.railway.app/data/mcserver/?ip=${ip}`)
    content = await a.json()

    name = `${content.version.name}`
    check = `${content.motd.clean}`

    if (name === "undefined") {
        message.channel.send({ content: "Server Not Found / Unsupported Server Version (Only support 1.7.2+) or the server is offline" })
    }

    if (check === "Server not found.") {
        message.channel.send({ content: "Server offline" })
    }

    const say = new MessageEmbed()
        .setColor('00FF00')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setTitle("**Server Found!**")
        .setDescription(`\nInfo:\nName: ${content.motd.clean}\n\Version: ${content.version.name}\nProtocol: ${content.version.protocol}\n\nCurrent Players: ${content.players.online}\nMaximum players: ${content.players.max}\n\nLatency: ${content.roundTripLatency}`)
        .setImage(`${content.favicon_url}`)

    message.channel.send({ embeds: [say] })

}
