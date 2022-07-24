const { MessageEmbed } = require('discord.js');
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
        return quiz.answer(answer => answer.toLowerCase() === response.content.toLowerCase());
    };

    const mainEmbed = new MessageEmbed()
        .setColor("00FF00")
        .setDescription(`Quiz: ${quiz.riddle}`)
    channel.send({ embeds: [mainEmbed] }).then(() => {
        message.channel.awaitMessages(filter, { max: 1, time: 30, errors: ['time'] }).then(collected => {
                message.channel.send({ content: `${collected.first().author} got the correct answer first!` });
            })
            .catch(() => {
                message.channel.send({ content: `The answer is ${quiz.answer} .Nobody got the right answer.` });
            });
        
    })
}  