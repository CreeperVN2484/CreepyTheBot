const fs = require('fs')

module.exports = (client) => {
    fs.readdir('./commands/', (err, files) => {
        if (err) console.log(err);

        let jsFile = files.filter(f => f.split('.').pop() === 'js');
        if (jsFile.length <= 0) {
            return console.log('No commands')
        }

        jsFile.forEach((file, i) => {
            let confcmd = require(`../../commands/${file}`);
            client.commands.set(confcmd.config.name, confcmd);

            console.log('Successfully loaded ' + confcmd.config.name + ' command ', '✅')

            if (!confcmd.config.name) {
                console.log(`❌  -> missing a help.name, or help.name is not a string.`)
            }
            if (!confcmd.config.group) {
                console.log('❌ -> Couldn\'t find any group in ' + confcmd.config.name)
                return;

            } else {
                if (!client.groups.includes(confcmd.config.group)) {
                    return console.log('❌ -> Unknown group ' + `${confcmd.config.group} in ` + confcmd.config.name)
                }
            }
            try {
                confcmd.config.aliases.forEach(alias => {
                    client.aliases.set(alias, confcmd.config.name);
                });
            } catch {

            }

        });
    });
}  