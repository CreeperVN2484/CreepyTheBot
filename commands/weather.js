const fetch = require('node-fetch')
const { MessageEmbed, Message, Client } = require("discord.js")

module.exports.config = {
    name: "weather",
    aliases: ['wtl'],
    cooldown: 120,
    group: "misc",
    usage: '.weather <country>',
    description: "Shows a country's weather"
}

module.exports.run = async (client, message, args) => {
    const location = args[0];

    if (!location) {
        return { error: "No Location provided" }
  }
    else {
        let content = await fetch(`https://pixel-api-production.up.railway.app/data/weather/?location=${location}`)

      content = await content.json()
      if (content.error) {
          const say = new MessageEmbed()
              .setColor('0000FF')
               .setDescription("Failed to fetch weather infomations")
           return message.channel.send(say)
       }
       else {
           const say = new MessageEmbed()
              .setColor('0000FF')
              .setDescription(content)
         return message.channel.send(say)
      }

    }

//        const say = new MessageEmbed()
//            .setColor('0000FF')
//            .setDescription("Currently Disabled (API Broken)")
//        message.channel.send(say)
}

