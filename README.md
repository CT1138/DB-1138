# DB-1138
 it's a bot. with code. that turns on.

    Please configure the bot in config.js, the bot requires a MySQL database, when you get one, import the SQL files in the database backup directory. 

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