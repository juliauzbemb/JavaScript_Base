
const readline = require('readline');

const { stdin: input, stdout: output } = require('process');

const fs = require('fs');

const rl = readline.createInterface({ input, output });


let gameData = {
    counter: 0,
    userInput: NaN,
    minNumber : 0,
    maxNumber: 1000,
    random: Math.floor(Math.random() * 1000),
}

function question (logger) {
    rl.question('Назовите число от 0 до 1000 (для выхода из игры - end) ', (answer) => {

        if (answer.toLowerCase() === 'end') {
            rl.close();
            return;
        }

        let userNum = parseInt(answer);

        if (userNum > gameData.maxNumber || userNum < gameData.minNumber || isNaN(userNum)) {
            logger(`Введено неверное число\n\n`);
            question(logger);
        } else if (userNum < gameData.random) {
            gameData.counter++;
            logger(`Номер текущей попытки - ${gameData.counter}\n`);
            logger(`Ваше число - ${userNum}\n`);
            logger('Ваше число меньше загаданного\n\n');
        } else if (userNum > gameData.random) {
            gameData.counter++;
            logger(`Номер текущей попытки - ${gameData.counter}\n`);
            logger(`Ваше число - ${userNum}\n`);
            logger('Ваше число больше загаданного\n\n');
        } else if (userNum === gameData.random) {
            gameData.counter++;
            logger(`Загаданное число - ${userNum}\n`);
            logger('Вы угадали! Поздравляем!\n');
            logger(`Общее число попыток составило ${gameData.counter}\n\n`);
            rl.close();
            return;
        }

        rl.pause();
        question(logger);
    });
}

function writeLog (path) {
    if (path) {
        fs.writeFileSync(path, "", "utf-8");
    }

    return function out(string) {
        if (path) {
            fs.appendFile(path, string, "utf-8", (err) => {
                if (err) {
                    console.log('Ошибка');
                }
            })
        }
        console.log(string);
    }
}


function main() {
    let logger = writeLog("./guessnumlogs")
    question(logger)
}

main();
