const { MessageEmbed, Intents } = require('discord.js');

module.exports.config = {
    name: "say",
    description: 'clone the message, resend and delete user message',
    group: 'misc',
    usage: '.say <message>',
    example: '.quiz something is wrong',
}
module.exports.run = async (client, message, args) => {
    let text = args.join(" ");
    message.delete();
    message.channel.send(text);
}