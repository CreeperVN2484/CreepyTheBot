const { MessageEmbed, Intents } = require('discord.js');
const fetch = require('node-fetch')

module.exports.config = {
    name: "quiz",
    description: 'Fun quiz',
    group: 'fun',
    usage: '.quiz',
    example: '.quiz',
}

module.exports.run = async (client, message, args) => {
    const riddle = await fetch(`https://pixel-api-production.up.railway.app/fun/riddle`)
    const quiz = await riddle.json()
    const filter = response => {
        return quiz.answer.some(answer => answer.toLowerCase() === response.content.toLowerCase());
    };
    
    const mainEmbed = new MessageEmbed()
        .setColor("00FF00")
    .setDescription(`Quiz: ${quiz.riddle}`)

    message.channel.send(mainEmbed).then(() => {
        message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
            .then(collected => {
                message.channel.send(`${collected.first().author} got the correct answer first!`);
            })
            .catch(() => {
                message.channel.send('Looks like nobody got the answer this time.');
            });
    });
 }