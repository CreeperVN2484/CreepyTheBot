const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

require('./utils/defines')(client);
require('./utils/structure/registery')(client);
require('./utils/handlers/commands')(client);
require('./utils/handlers/events')(client);

client.on("messageCreate", async (message) => {
    message.channel.messages.fetch()
    require('./utils/handlers/handler')(client, message)
});

client.on('messageUpdate', (o, message) => {
    require('./utils/handlers/editHandles')(client, message);
})

client.login(process.env.TOKEN)
