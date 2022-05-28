const fetch = require('node-fetch')
const { MessageEmbed, Message, Client } = require("discord.js")

module.exports.config = {
    name: "weather",
    aliases: ['wtl'],
    cooldown: 100,
    group: "misc",
    usage: '.weather <country>',
    description: "Shows a country's weather"
}

exports.Weather = async function (location) {
    if (!location) {
        return { error: "No Location provided" }
    }
    else {
        let content = await fetch(`https://pixel-api-production.up.railway.app/data/weather/?location=${location}`)

        content = await content.json()
        if (content.error) {
            return content
        }
        else {
            return content
        }

    }
}

module.exports.run = async (client, message, args) => {
  //  const location = args[1];

//    if (!location) {
//        return { error: "No Location provided" }
 //   }
 //   else {
 //       let content = await fetch(`https://pixel-api-production.up.railway.app/data/weather/?location=${location}`)

  //      content = await content.json()
  //      if (content.error) {
  //          const say = new MessageEmbed()
  //              .setColor('0000FF')
 //               .setDescription(content)
 //           message.channel.send(say)
 //       }
 //       else {
 //           const say = new MessageEmbed()
  //              .setColor('0000FF')
  //              .setDescription(content)
  //          message.channel.send(say)
  //      }

   // }

        const say = new MessageEmbed()
            .setColor('0000FF')
            .setDescription("Currently Disabled (API Broken)")
        message.channel.send(say)
}

