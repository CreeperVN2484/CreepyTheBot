const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fetch = require('node-fetch')

module.exports.config = {
    name: "ytfetch",
    aliases: ['yt'],
    cooldown: 10,
    group: "misc",
    usage: '.ytfetch',
    description: "Fetch for youtube videos"
}

module.exports.run = async (client, message, args) => {
    const nvideo = args.join(" ");
    const video = nvideo.replace(" ", "%20")
    if (!video) {
        message.channel.send({ content: "No video name provided" })
    }

    let a = await fetch(`https://pixel-api-production.up.railway.app/data/youtube/?video=${video}`)
    content = await a.json()
    contentvideo = `${content.video}`

    try {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Go to video')
                    .setStyle('LINK')
                    .setURL(`${content.video}`)
            );

        const say = new MessageEmbed()
            .setColor('00FF00')
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
            .setTitle("**Video Found!**")
            .setDescription(`\nInfo:\nVideo: ${content.title}\nPosted By: ${content.author}\nChannel: ${content.channel}\nViews: ${content.views}\n\nDescription:\n${content.description}`)
            .setFooter(`content.thumbnail`)

        await interaction.reply({ embeds: [embed], components: [row] });
    } catch (err) {
        message.channel.send({ content: "Video not found" })
    }
}
