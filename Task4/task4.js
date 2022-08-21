// Бой идет по ходам. Каждый ход компьютер (Лютый) случайно выбирает одно из доступных действий и сообщает, что он собирается делать.
// В ответ на это игрок (Евстафий) должен выбрать свое действие.

// После происходит взаимное нанесение урона. Магическая броня блокирует магический урон, физическая броня блокирует физический урон.

// После совершения действия, оно не может быть повторно выбрано в течение cooldown ходов

// Бой идет до победы одного из противников.

// Перед началом боя игрок выбирает сложность (начальное здоровье Евстафия)

const readlineSync = require("readline-sync");

const verification = (num, max) => {
    if (+num <= 0 || num > max || isNaN(+num)) {
        console.log("Введите корректное значение");
        return false;
    }
    return true;
};

let difficultyLevel = "";
while (true) {
    difficultyLevel = readlineSync.question(
        `Выберите уровень сложности: (1: Легкий (HP 12), 2: Средний (HP 10), 3: Сложный (HP 8)) `
    );

    if (verification(difficultyLevel, 3)) break;
}

const mageHealth = (level) => {
    let maxHealth;
    if (level === "1") {
        maxHealth = 12;
    }
    if (level === "2") {
        maxHealth = 10;
    }
    if (level === "3") {
        maxHealth = 8;
    }
    return maxHealth;
};

const monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [
        {
            name: "Удар когтистой лапой",
            physicalDmg: 3, // физический урон
            magicDmg: 0, // магический урон
            physicArmorPercents: 20, // физическая броня
            magicArmorPercents: 20, // магическая броня
            cooldown: 0, // ходов на восстановление
        },
        {
            name: "Огненное дыхание",
            physicalDmg: 0,
            magicDmg: 4,
            physicArmorPercents: 0,
            magicArmorPercents: 0,
            cooldown: 3,
        },
        {
            name: "Удар хвостом",
            physicalDmg: 2,
            magicDmg: 0,
            physicArmorPercents: 50,
            magicArmorPercents: 0,
            cooldown: 2,
        },
    ],
};

const mage = {
    maxHealth: mageHealth(difficultyLevel),
    name: "Евстафий",
    moves: [
        {
            name: "Удар боевым кадилом",
            physicalDmg: 2,
            magicDmg: 0,
            physicArmorPercents: 0,
            magicArmorPercents: 50,
            cooldown: 0,
        },
        {
            name: "Вертушка левой пяткой",
            physicalDmg: 4,
            magicDmg: 0,
            physicArmorPercents: 0,
            magicArmorPercents: 0,
            cooldown: 4,
        },
        {
            name: "Каноничный фаербол",
            physicalDmg: 0,
            magicDmg: 5,
            physicArmorPercents: 0,
            magicArmorPercents: 0,
            cooldown: 3,
        },
        {
            name: "Магический блок",
            physicalDmg: 0,
            magicDmg: 0,
            physicArmorPercents: 100,
            magicArmorPercents: 100,
            cooldown: 4,
        },
    ],
};

const monsterAttack = () => {
    monster.moves.forEach((elem) => {
        if (elem.freeze) {
            elem.freeze -= 1;
        }
        if (elem.freeze <= 0) {
            delete elem.freeze;
        }
    });
    const filterMoves = monster.moves.filter((elem) => !elem.freeze);

    let randomAttack =
        filterMoves[Math.floor(Math.random() * filterMoves.length)];

    monster.moves.forEach((elem) => {
        if (elem.name === randomAttack.name) {
            elem.freeze = elem.cooldown;
        }
    });
    console.log(`${monster.name} использует ${randomAttack.name}`);
    return randomAttack;
};

const mageAttack = () => {
    mage.moves.forEach((elem) => {
        if (elem.freeze) {
            elem.freeze -= 1;
        }
        if (elem.freeze <= 0) {
            delete elem.freeze;
        }
    });
    const filterMoves = mage.moves.filter((elem) => !elem.freeze);

    console.log(`Чем ответит ${mage.name}? `);
    5;

    filterMoves.forEach((element, index) => {
        console.log(`${index + 1}: ${element.name}`);
    });
    let userAttack = "";
    while (true) {
        userAttack = readlineSync.question`Выберите действие: `;
        if (verification(userAttack, filterMoves.length)) {
            break;
        }
    }

    console.log(`${mage.name} использует: ${filterMoves[userAttack - 1].name}`);

    mage.moves.forEach((elem) => {
        if (elem.name === filterMoves[userAttack - 1].name) {
            elem.freeze = elem.cooldown;
        }
    });
    return filterMoves[userAttack - 1];
};

const fight = (monsterMoves, mageMoves) => {
    mage.maxHealth =
        mage.maxHealth -
        (monsterMoves.physicalDmg -
            (monsterMoves.physicalDmg * mageMoves.physicArmorPercents) / 100) -
        (monsterMoves.magicDmg -
            (monsterMoves.magicDmg * mageMoves.magicArmorPercents) / 100);
    monster.maxHealth =
        monster.maxHealth -
        (mageMoves.physicalDmg -
            (mageMoves.physicalDmg * monsterMoves.physicArmorPercents) / 100) -
        (mageMoves.magicDmg -
            (mageMoves.magicDmg * monsterMoves.magicArmorPercents) / 100);

    console.log(
        `После боя здоровье Евстафия : ${mage.maxHealth}, здоровье Лютого : ${monster.maxHealth}`
    );
};

const startGame = () => {
    while (true) {
        fight(monsterAttack(), mageAttack());
        if (mage.maxHealth <= 0 && monster.maxHealth <= 0)
            return `Ничья! ${monster.name} и ${mage.name} погибли в этом бою!`;
        else if (mage.maxHealth > 0 && monster.maxHealth < 0)
            return `Победа! ${mage.name} смог сразить монстра!`;
        else if (mage.maxHealth < 0 && monster.maxHealth > 0) {
            return `Поражение! ${monster.name} оказался сильнее!`;
        }
    }
};

console.log(startGame());
