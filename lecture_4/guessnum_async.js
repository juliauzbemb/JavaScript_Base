const readline = require('readline')

const { stdin: input, stdout: output } = require('process')

const rl = readline.createInterface( {input, output} )


let gameData = {
    tries: 0,
    minNumber: 0,
    maxNumber: 1000,
    randomNumber: Math.floor(Math.random() * 1000)
}

const fs = require('fs');

async function writeToFile(string) {
    await fs.promises.appendFile("./guessnumlogs_async", string, {
        encoding: "utf-8"
    });
}


async function getUserInput () {
    let promise = new Promise(function (resolve) {
        rl.question('Введите число от 0 до 1000. Для выхода из игры введите "exit"\n', (input) => {
            let number = input;
            rl.pause();
            return resolve(number);
        })
    })
    return await promise;
}


async function game () {
    while (true) {
        let input = await getUserInput();
        if (input.toLowerCase() === 'exit') {
            break;
        }
        let number = parseInt(input);


        if (isNaN(number) || number < gameData.minNumber || number > gameData.maxNumber) {
            let errorText = 'Введено некорректное число. Повторите попытку \n';
            writeToFile(errorText);
            console.log(errorText);
            continue;
        }

        gameData.tries++;

        if(number === gameData.randomNumber) {
            let message = `Вы угадали. Загаданное число - ${gameData.randomNumber}. Использовано попыток: ${gameData.tries}\n`;
            writeToFile(message);
            console.log(message);
            break;
        }
        
        if (number > gameData.randomNumber) {
            let message = `Ваше число ${number} больше загаданного. Попытка: ${gameData.tries}\n`;
            writeToFile(message);
            console.log(message);
        } else if (number < gameData.randomNumber) {
            let message = `Ваше число ${number} меньше загаданного. Попытка: ${gameData.tries}\n`;
            writeToFile(message);
            console.log(message);
        } 
    }
    rl.close()
}

game();