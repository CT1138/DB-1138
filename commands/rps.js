module.exports = {
    name: 'rps',
    description: "help",
    execute(message, args) {

        if(!args[1]) return message.channel.send('You didn\'t pick rock, paper, or scissors!');

        const getUserChoice = userInput => {
            userInput = userInput.toLowerCase();
              if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors') {
                return userInput;
                } else {
                message.channel.send('Invalid args');
                }
          };

        const getComputerChoice = () => {
            const num = Math.floor(Math.random() * 3)
            if (num == 0) return 'rock';
            if (num == 1) return 'paper';
            if (num == 2) return 'scissors';
          };

          const determineWinner = (userChoice, computerChoice) => {
            if (userChoice === computerChoice) return 'Tie!';
            if (userChoice === 'scissors' && computerChoice === 'paper') return `You won! I did ${computerChoice}`;
            if (userChoice === 'paper' && computerChoice === 'rock') return `You won! I did ${computerChoice}`;
            if (userChoice === 'rock' && computerChoice === 'scissors') return `You won! I did ${computerChoice}`;
          
            if (userChoice === 'paper' && computerChoice === 'scissors') return `I won! I did ${computerChoice}`;
            if (userChoice === 'rock' && computerChoice === 'paper') return `I won! I did ${computerChoice}`;
            if (userChoice === 'scissors' && computerChoice === 'rock') return `I won! I did ${computerChoice}`;
          };

          message.channel.send( determineWinner( getUserChoice(args[1]), getComputerChoice() ) )
    }
}