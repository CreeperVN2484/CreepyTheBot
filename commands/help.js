const { MessageEmbed, Client, Message } = require('discord.js');

module.exports.config = {
    name: "help",
    group: "info",
    usage: 'help',
    guarded: true,
    example: ".help",
    botperms: ["EMBED_LINKS"],
    description: "Help menu for all commands"
}

module.exports.run = async (client, message, args) => {

        try {
            let pu = await client.commands.get(args[0]) || await client.commands.get(client.aliases.get(args[0]))

            if (client.commands.has(args[0]) || client.commands.has(client.commands.get(client.aliases.get(args[0]).config.name))) {


                                 return message.channel.send(`
    
${pu.config.name ? `**Name:** ${pu.config.name}` : ""}${pu.config.description ? '\n' : ""}${pu.config.description ? `**Description:** ${pu.config.description}` : ""}${pu.config.aliases ? '\n' : ""}${pu.config.aliases ? `**Aliases:** ${pu.config.aliases.join(', ')}` : ""}${pu.config.group ? '\n' : ""}${pu.config.group ? `**Group:** ${pu.config.group}` : ""}${pu.config.permissions ? '\n' : ''}${pu.config.permissions ? `**Permissions:** ${pu.config.permissions.join(', ').toLocaleLowerCase()}` : ""}${pu.config.usage ? '\n' : ""}${pu.config.usage ? `**Usage:** ${pu.config.usage}` : ""}${pu.config.example ? "\n" : ""}${pu.config.example ? `**Example:** ${pu.config.example}` : ""}                             

                `)

            } else {

            }
        } catch {
        }
                

    if (!args[0]) {
        let embed = new MessageEmbed()
        .setColor('0000FF')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setTitle("Bot's commands")
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription("\n *Here is **Every** Commands that I have for you!*\n\n **Moderator Commands** \n`ban` `kick` `warn` `unban` `lock` `unlock` `delwarn` `modlogs` `warning` `mute` `unmute` `nickname` `setmodlog` `warnings`\n\n**Fun commands** \n `quiz` (More coming soon! thx to Pixel's API)\n\n**Management Commands**  \n `antibot` `invites` `objembed` `settings` `setup`\n\n**Misc Commands** \n `avatar` `roleinfo` `snipe` `whois`\n\n **Information commands.**  \n `help` `ping` `serverinfo`\n\n**Setting commands** \n `disable` `enable` `prefix` `setmuterole` `setperms`")
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
    message.channel.send(embed)
        let infoembed = new MessageEmbed()
        .setColor('0000FF')
        .setTitle("Help Infomations")
        .setDescription(`The prefix for commands is: ${client.prefix}\n\n**Embed Message Color Info:**\n*Blue*: Infomation\n*Green*: Command Succeeded\n*Red*: Command Failed\nBot Status: https://stats.uptimerobot.com/D7070ForQM`)
    message.channel.send(infoembed)
    };
}