
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = async(client, message) => {
    if (message.author.bot) return;

    var prePrefix;
    if (require('../database/prefixes.json')[message.guild.id]) {
        prePrefix = await require('../database/prefixes.json')[message.guild.id].prefix;

    } else {
        prePrefix = "."
    }
    const escapeRegex = require('../utils/structure/exports/escapeRegex').escapeRegex
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prePrefix)})\\s*`);
	if (!prefixRegex.test(message.content)) return;

}