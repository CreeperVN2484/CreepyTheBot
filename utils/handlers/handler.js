const { token, prefix: mainPrefix, owners } = require('../../config/bot.json')
const { MessageEmbed, Client, Message } = require('discord.js');



/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    if (message.channel.type === "UNKNOWN") return;
    var prePrefix;
    if (require('../../database/prefixes.json')[message.guild.id]) {
        prePrefix = await require('../../database/prefixes.json')[message.guild.id].prefix;


    } else {
        prePrefix = mainPrefix
    }
    var escapeRegex = require('../structure/exports/escapeRegex').escapeRegex
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prePrefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;

    const [, prefix] = message.content.match(prefixRegex);
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);

    const cmm = args.shift().toLocaleLowerCase();



    var command = client.commands.get(cmm) || client.commands.get(client.aliases.get(cmm)) //client.commands.get(cmm) || client.commands.get(client.aliases.get(cmm))

    if (!command) return;

    if (command.config.permissions) {
        let neededPerms = [];

        command.config.permissions.forEach((p) => {
            if (!message.member.permissions.has(p)) neededPerms.push('`' + p + '`');
        });

        if (command.config.guildOnly) {
            if (command.config.guildOnly === true) {
                if (message.channel.type === "UNKNOWN") {
                    return message.channel.send({ embeds: [client.guildOnlyCmd] });
                }
            }
        }

        try {
            if (require('../../database/perms.json')[command.config.name][message.guild.id] !== 'NONE') {
                if (!message.member.permissions.has(require('../../database/perms.json')[command.config.name][message.guild.id])) {
                    neededPerms = [];
                    //   console.log('Reseting..')
                    await neededPerms.push('`' + require('../../database/perms.json')[command.config.name][message.guild.id] + '`')
                }
            } else {
                neededPerms = []
            }

        } catch (e) {
            //   console.log(e)
        }
        if (neededPerms.length) {
            const noPEmbe = new MessageEmbed()
                .setColor(client.color)
                .setDescription(`You need ${neededPerms.join(', ')} permissions to use this command`)
            try {
                return await message.channel.send({ embeds: [noPEmbe] });
            } catch {
                try {
                    return await message.channel.send({ content: `I am missing the \`EMBED_LINKS\` permission` });
                } catch {
                    const cantSend = await new MessageEmbed()
                        .setColor(client.color)
                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                        .setDescription('I am missing permissions to send messages in **' + message.guild.name + '**')
                        .setFooter(message.guild.name, message.guild.iconURL())

                    return message.member.send({ embeds: [cantSend] })
                }
            }
        }
    }
    if (command.config.ownerOnly) {
        if (command.config.ownerOnly === true) {
            if (!owners.includes(message.author.id)) return message.reply({ content: `That command is a owner only command LMAO` })
        }
    }

    if (command.config.botperms) {
        let neededPerms = [];

        command.config.botperms.forEach((p) => {
            if (!message.guild.me.permissions.has(p)) neededPerms.push('`' + p + '`');
        });




        if (neededPerms.length) {

            const noPEmbe = await new MessageEmbed()
                .setColor(client.color)
                .setDescription(`I am missing ${neededPerms.join(', ')} permission(s)`)
            return await message.channel.send({ embeds: [noPEmbe] });
            //  return message.member.send({ embeds: [cantSend] });
        }


    }

    client.main = new MessageEmbed()
        .setColor(client.color)
        .setTitle(`Command: ${command.config.name}`)
        .setDescription(`**Description:** ${command.config.description} \n**Cooldown:** 3 second(s) ${command.config.aliases ? '\n' : ''}${command.config.aliases ? `**Aliases:** ${command.config.aliases.join(', ')}` : ''} \n  **Usage:** ${command.config.usage} \n **Example:** ${command.config.example || "None"}`)



    let commandFile = client.commands.get(cmm) || client.commands.get(client.aliases.get(cmm))
    if (commandFile) {
        if (client.cooldown.has(message.author.id)) return message.reply({ content: 'A little to quick there' });
        try {
            if (await require('../../database/enables.json')[commandFile.config.name][message.guild.id] === true) {
                return message.reply({ embeds: [client.disabled] });
            }
        } catch {

        }
        if (!message.guild.me.permissions.has('USE_EXTERNAL_EMOJIS')) return message.reply({ content: 'I cannot do anything without \`USE_EXTERNAL_EMOJIS\` permissions' })
        commandFile.run(client, message, args);
        if (!owners.includes(message.author.id)) {
            client.cooldown.add(message.author.id);
            setTimeout(() => {
                client.cooldown.delete(message.author.id)
            }, 3000)
        };

    };
}  