const { Client, Message, MessageEmbed, MessageAttachment } = require("discord.js");
const { inspect } = require("util");

module.exports.config = {
    name: "eval",
    group: "owners",
    ownerOnly: true,
    guarded: true,
    usage: '.eval <code>',
    example: '.eval console.log("Hello world")'
}

module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send({ embeds: [client.main] });
    let code = args.join(' ')
    code = code.replace(/[""]/g, '"').replace(/['']/g, "'")

    let evaled;
    try {
        const start = process.hrtime()
        evaled = eval(code);
        if (evaled instanceof Promise) {
            evaled = await eval
        }
        const stop = process.hrtime(start);
        let response = [
            `**OutPut: \`\`\`js\n${(inspect(evaled, { depth: 0 }))}\n\`\`\``
            , `**Time taken: \`\`\`${(((stop[0] * 1e9) + stop[1])) / 1e6}ms \`\`\``
        ]
        const res = response.join('\n')
        if (res.length < 2000) {
            await message.channel.send({ embeds: [res] })
        } else {
            const output = new MessageAttachment(Buffer.from(res), 'output.txt');
            await message.channel.send({ embeds: [output] });

        }
    } catch (error) {
        console.log(error)
        message.reply({ content: 'Err' })
    }
}  