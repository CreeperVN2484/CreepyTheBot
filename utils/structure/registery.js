const { MessageEmbed, Message } = require("discord.js")

module.exports = (client) => {

    client.alreadyEnabled = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} That command is already enabled`)

    client.alreadyDisabled = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} That command is already disabled`)

    client.guarded = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} You cannot enable/disable that command`);

    client.aintCommandSherlock = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} Unknown command`)

    client.noMember = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} Unknown member`)


    client.noUser = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} Unknown user`)

    client.roleHigher = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} That user is a higher role than me`)

    client.noSnipes = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} There\'s no messages to snipe`)

    client.higherRole = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} That member is a higher role than you`);

    client.incorrectOP = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} There are Only \`ban, kick\` bot punishments `)

    client.incorrectUserPunish = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} There are only \`ban, kick, remove_roles\` user punishments`)

    client.noUserDB = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} User not found in database`)

    client.userstaff = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} That member is a mod/admin! I can\'t do that`)

    client.userNoWarns = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} _The user has no warnings_`)


    client.cantDelOwnWarn = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} _You cannot delete your own warning_`)


    client.amountNum = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} Amount must be a number`)

    client.guildOnlyCmd = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} This is a guild only command`)

    client.noMuteRole = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} Failed to find mute role`);

    client.muteRoleInvalid = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} Mute role found in database but not server`)

    client.roleHigherThanMe = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} The mute role is a higher role than me`);

    client.noChannel = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} Unknown Channel `)

    client.disabled = new MessageEmbed()
        .setColor("FF0000")
        .setDescription(`${client.fail} That command is disabled`)

    client.noperms = new MessageEmbed()
        .setColor("00FF00")
        .setDescription(`${client.fail}Member missing required permissions`)

    client.setupStart = new MessageEmbed()
        .setColor("00FF00")
        .setDescription(`${client.success} _Starting setup_`)

    client.setlogsChannel = new MessageEmbed()
        .setColor("00FF00")
        .setDescription(`${client.success} All modlogs have been set to this channel`)

    client.completeSetup = new MessageEmbed()
        .setColor("00FF00")
        .setDescription(`${client.success} _Completed setup!_`)


}