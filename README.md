# DB-1138
(Discord Bot 1138)
 it's a bot. with code. that turns on.

    Please configure the bot in config.js before starting the bot.
    You need to install Node.JS to actually run the bot, install it here: https://nodejs.org/en/
    The bot requires a MySQL database, when you get one, import the SQL files in the database backup directory. 
    To start the bot, open up a terminal in the bot's root directory and type: "node ./index.js"

# Adding new commands

If you want to add commands, add the following code into line 23 or below in handler.js:
    
    case "<command name>":
     variable.client.commands.get('<command name>).execute(<variables you want to export>)
     break;

Then create a file named <command name>.js in the commands directory and put the following code in it:

    module.exports = {
        name: <command name>,
        description: "",
        execute(<variables to import>) {

        }
    }
    
# If there are issues:

Contact me on discord: RC-1138#0001

Start a new issue on the issues tab in this repl (idk what it's called lol)
