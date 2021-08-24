# Requirements

    Node.js; https://nodejs.org/en/
    Mysql Database; https://www.microfocus.com/documentation/idol/IDOL_12_0/MediaServer/Guides/html/English/Content/Getting_Started/Configure/_TRN_Set_up_MySQL.htm
    Discord Bot Account; https://discordpy.readthedocs.io/en/latest/discord.html ( ik this guide is for discord.py, not discord.js, but it's the same process so just use this )
    Presence Intent and Server Members Intent enabled on the Discord Dev Portal  

# Starting the bot

    Open a command line instance in the root directory of the bots code, then run the command "npm i nodemon -g" (only need to do this once, this installs nodemon globally)
    Open run.bat

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

Contact me on discord: CT-7567#0001

Start a new issue on the issues tab in this repo (idk what it's called lol)
