module.exports = {
    name: "menu",
    usePrefix: false,
    usage: "menu [command_name] (optional) | help all",
    version: "1.3",

    execute(api, event, args) {
        const { threadID, messageID } = event;

        if (args.length > 0) {
            const commandName = args[0].toLowerCase();

            if (commandName === "all") {
                // Show all commands in alphabetical order
                const allCommands = Array.from(global.commands.values())
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((cmd, index) => `${index + 1}. ${cmd.name} (${cmd.usePrefix ? "uses prefix" : "no prefix"})\n   Usage: ${cmd.usage}`)
                    .join("\n\n");

                const allHelpMessage = `
╔════════════╗
  All Command 
╚════════════╝
${allCommands}

Use 'menu [command_name]' for details.

 Owner: Alvarez 
                `;

                return api.sendMessage(allHelpMessage, threadID, messageID);
            }

            // Show details for a specific command
            const command = global.commands.get(commandName);

            if (!command) {
                return api.sendMessage(`❌ Command '${commandName}' not found.`, threadID, messageID);
            }

            const commandHelpMessage = `
╔════════════╗
  Command Info 
╚════════════╝
Name: ${command.name}
Usage: ${command.usage}
Prefix Required: ${command.usePrefix ? "✅ Yes" : "❌ No"}
Version: ${command.version}

Owner: Alvarez
            `;

            return api.sendMessage(commandHelpMessage, threadID, messageID);
        }

        // Show only 5 random commands for 'help'
        const commandArray = Array.from(global.commands.values())
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(0, 5)
            .map((cmd, index) => `${index + 1}. ${cmd.name} (${cmd.usePrefix ? "uses prefix" : "no prefix"})\n   Usage: ${cmd.usage}`)
            .join("\n\n");

        const helpMessage = `
╔════════════╗
  Bot Commands 
╚════════════╝
Here are some commands:  
${commandArray}

Use 'menu all' to see all commands.
Use 'menu [command_name]' for details.

Owner: Alvarez
        `;

        api.sendMessage(helpMessage, threadID, messageID);
    }
};
