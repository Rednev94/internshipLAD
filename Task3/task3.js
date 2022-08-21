// Компьютер загадывает число из нескольких различающихся цифр (от 3 до 6). Игроку дается несколько попыток на то, чтобы угадать это число.

// После каждой попытки компьютер сообщает количество совпавших цифр стоящих не на своих местах, а также количество правильных цифр на своих местах.

// Например загаданное число: 56478 предположение игрока: 52976

// ответ: совпавших цифр не на своих местах - 1 (6), цифр на своих местах - 2 (5 и 7)

// игра ведется до окончания количества ходов либо до отгадывания

// Кстати, в Fallout 3, Fallout New Vegas и Fallout 4 для взлома терминалов используется очень похожая мини игра.

const readlineSync = require("readline-sync");

const generateNumber = (amountNumber) => {
    let numArray = [];
    Math.floor(Math.random() * 10);
    for (; numArray.length < amountNumber; ) {
        let num = Math.floor(Math.random() * 10);
        if (!numArray.includes(num)) {
            numArray.push(num);
        }
    }
    return numArray.join("");
};

const verification = (num, length, ...args) => {
    if (+num === 0 || isNaN(+num)) {
        console.log("Введите корректное число");
        return false;
    }
    if (num.length !== [...new Set(num)].length) {
        console.log("Введите число из не повторяющихся цифр");
        return false;
    }
    if (length !== -1 && num.length !== length) {
        console.log(`Введите число из ${length} цифр`);
        return false;
    }
    if (num < args[0] || num > args[1]) {
        console.log(`Число должно быть от ${args[0]} до ${args[1]}`);
    } else return true;
};

const generateAnswer = (compNum, attempts) => {
    let userNumber = readlineSync.question(
        `Введите число состоящее из ${compNum.length} цифр: `
    );
    if (verification(userNumber, compNum.length)) {
        let numbersInPlace = 0;
        let guessedNumbers = 0;
        let answer = "";
        for (let i = 0; i < userNumber.length; i++) {
            if (compNum.indexOf(userNumber[i]) === -1) continue;
            else if (compNum.indexOf(userNumber[i]) === i) {
                numbersInPlace += 1;
            } else {
                guessedNumbers += 1;
            }
        }

        if (guessedNumbers === 0 && numbersInPlace === 0) {
            answer = `${guessedNumbers} цифр совпало, осталось попыток: ${
                attempts - 1
            }`;
        } else if (numbersInPlace === userNumber.length) {
            answer = `Число отгадано`;
        } else if (attempts - 1 !== 0) {
            answer = `совпавших цифр не на своих местах - ${guessedNumbers}, цифр на своих местах - ${numbersInPlace}, осталось попыток: ${
                attempts - 1
            }`;
        } else {
            answer = `Число не отгадано`;
        }
        return answer;
    } else {
        return generateAnswer(compNum, attempts);
    }
};

const startGame = () => {
    let amountNumbers = readlineSync.question(
        "Сколько цифр загадает компьютер? (от 3 до 6) "
    );

    if (verification(amountNumbers, 1, 3, 6)) {
        while (true) {
            let amountAttempts = readlineSync.question(
                "Сколько попыток на то, что бы угадать число? (введите количество попыток, max 20): "
            );
            if (verification(amountAttempts, -1, 1, 20)) {
                const compNumber = generateNumber(amountNumbers);

                for (; amountAttempts; amountAttempts--) {
                    let finalAnswer = generateAnswer(
                        compNumber,
                        amountAttempts
                    );
                    if (finalAnswer === `Число отгадано`) {
                        return finalAnswer;
                    }
                    if (finalAnswer === `Число не отгадано`) {
                        return finalAnswer;
                    }
                    console.log(finalAnswer);
                }
            }
        }
    } else {
        return startGame();
    }
};

console.log(startGame());
