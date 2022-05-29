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
               .setDescription(`Info:\n\nLocation: ${content.info.location}\nCountry: ${content.info.country}\n\nWeather:Tempurature: ${content.weather.temp_c}°C / ${content.weather.temp_f}°F\nFeel Like: ${content.weather.feels_c}°C / ${content.weather.feels_f}°F\nCurrent Condition: ${content.weather.condition}\nWind: ${content.weather.wind_kph}KM/H / ${content.weather.wind_mph}MPH\nHumidity:${content.weather.humidity}%`)
              .setImage("https://cdn.weatherapi.com/weather/64x64/day/113.png")
         return message.channel.send(say)
      }

    }

//        const say = new MessageEmbed()
//            .setColor('0000FF')
//            .setDescription("Currently Disabled (API Broken)")
//        message.channel.send(say)
}

