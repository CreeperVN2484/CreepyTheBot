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
        return message.channel.send("Error: No Location provided")
    }
    else {
        let content = await fetch(`https://pixel-api-production.up.railway.app/data/weather/?location=${location}`)

        content = await content.json()
        if (content.error) {
            const say = new MessageEmbed()
                .setColor('FF0000')
                .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
                .setDescription("Failed to fetch weather infomations")
            return message.channel.send(say)
        }
        else {
            const say = new MessageEmbed()
                .setColor('00FF00')
                .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
                .setDescription(`Info:\nLocation: ${content.info.location}\nCountry: ${content.info.country}\n\nWeather:\nTempurature: ${content.weather.temp_c}oC / ${content.weather.temp_f}oF\nFeel Like: ${content.weather.feels_c}oC / ${content.weather.feels_f}oF\nCurrent Condition: ${content.weather.condition}\nWind: ${content.weather.wind_kph}KPH / ${content.weather.wind_mph}MPH\nHumidity:${content.weather.humidity}%`)
                .setImage(`${content.weather.icon}`)
            return message.channel.send(say)
        }

    }
}

