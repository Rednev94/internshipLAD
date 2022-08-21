// В данном тексте изменить наименование дней недели на английский вариант.
// Например, строка "Старший братец ПОНЕДЕЛЬНИК ..." будет преобразована в "Старший братец MONDAY..."

let str = `Старший братец ПОНЕДЕЛЬНИК –
работяга, не бездельник.
Он неделю открывает
всех трудиться зазывает.
ПОНЕДЕЛЬНИК

ВТОРНИК следует за братом
у него идей богато.

А потом СРЕДА-сестрица,
не пристало ей лениться.

Брат ЧЕТВЕРГ и так, и сяк,
он мечтательный чудак.

ПЯТНИЦА-сестра сумела
побыстрей закончить дело.

Предпоследний брат СУББОТА
не выходит на работу.

В гости ходит ВОСКРЕСЕНЬЕ,
очень любит угощенье
`;

// для первого вхождения

// const translateWeekDays = (string) => {
//     return string
//         .replace("ПОНЕДЕЛЬНИК", "MONDAY")
//         .replace("ВТОРНИК", "TUESDAY")
//         .replace("СРЕДА", "WEDNESDAY")
//         .replace("ЧЕТВЕРГ", "THURSDAY")
//         .replace("ПЯТНИЦА", "FRIDAY")
//         .replace("СУББОТА", "SATURDAY")
//         .replace("ВОСКРЕСЕНЬЕ", "SUNDAY");
// };

// console.log(translateWeekDays(str));

// для всех вхождений

const translateWeekDays = (string) => {
    return string
        .replaceAll("ПОНЕДЕЛЬНИК", "MONDAY")
        .replaceAll("ВТОРНИК", "TUESDAY")
        .replaceAll("СРЕДА", "WEDNESDAY")
        .replaceAll("ЧЕТВЕРГ", "THURSDAY")
        .replaceAll("ПЯТНИЦА", "FRIDAY")
        .replaceAll("СУББОТА", "SATURDAY")
        .replaceAll("ВОСКРЕСЕНЬЕ", "SUNDAY");
};

console.log(translateWeekDays(str));
