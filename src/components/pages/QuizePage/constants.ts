import { QuestionType, TypeQuestion, TypeQuestionBlock } from "./types";

const questionBlocks: TypeQuestionBlock[] = [
    {
        id: 1,
        title: 'Личная информация',
    },
    {
        id: 2,
        title: 'Размеры',
    },
    {
        id: 3,
        title: 'Внешность',
    },
    {
        id: 4,
        title: 'Образ жизни',
        description: `
            На этом этапе важно определить доминирующие сферы вашей жизни. 
            Например, вы живете с детьми: сестрами/братьями или собственными, проводите с ними много времени - отмечайте галочкой вариант "время с детьми" и стилист сделает упор на удобные и функциональные вещи.
            Часто ходите в театры, на выставки? Лучше укажите это в пункте "другое", так стилисту будет проще подобрать вам нужный образ. 
            Часто путешествуете? Тогда вам могут потребоваться вещи в поездки: менее мнущиеся, легкие в уходе. 
            Для стилиста важно понимать где и как вы проводите время! 
            *Всю необходимую информацию вы также сможете указать в самом конце анкеты - раздел "дополнительная информация".
        `
    },
    {
        id: 5,
        title: 'Вкусовые предпочтения',
        description: 'Пожалуйста, отнеситесь к данному разделу внимательно, отвечайте вдумчиво.'
    },
    {
        id: 6,
        title: 'Цели и бюджет',
        description: `
            Стилистам важно понимать какие суммы вы готовы выделить на покупку одежды/сумок/обуви. 
            Так они с большей вероятностью подберут вам одежду, соответствующую вашим ценовым ожиданиям.
            Проанализируйте: на что вы тратите в меньшей степени и на что в большей. 
        `
    },
    {
        id: 7,
        title: 'Бренды'
    },
    {
        id: 8,
        title: 'Дополнительная информация:'
    },
]

export const questions: TypeQuestion[] = [
    {
        id: 1,
        type: QuestionType.INPUT,
        description: 'Ваше имя, фамилия',
        block: questionBlocks[0]
    },
    {
        id: 2,
        type: QuestionType.INPUT,
        description: 'Ваш возраст',
        block: questionBlocks[0]
    },
    {
        id: 3,
        type: QuestionType.INPUT,
        description: 'Город проживания',
        block: questionBlocks[0]
    },
    {
        id: 4,
        type: QuestionType.INPUT,
        description: 'Ваш email',
        block: questionBlocks[0]
    },
    {
        id: 5,
        type: QuestionType.INPUT,
        description: 'Ваш номер телефона',
        block: questionBlocks[0]
    },
    {
        id: 6,
        type: QuestionType.SINGLE_OPTION,
        description: 'Семейное положение',
        block: questionBlocks[0],
        options: ['Замужем', 'Не замужем']
    },
    {
        id: 7,
        type: QuestionType.SINGLE_OPTION,
        description: 'Вы работаете?',
        block: questionBlocks[0],
        options: ['Да', 'Нет']
    },
    {
        id: 9,
        type: QuestionType.SINGLE_OPTION,
        description: 'Формат вашей работы?',
        block: questionBlocks[0],
        options: ['В офисе, где есть дресс-код', 'В офисе, но дресс-кода нет', 'Удалённо', 'Фриланс', 'У меня свое дело', "Не работаю", "Другое…"]
    },
    {
        id: 8,
        type: QuestionType.INPUT,
        description: 'Ваша профессия',
        block: questionBlocks[0]
    },
    {
        id: 10,
        type: QuestionType.INPUT,
        description: 'Ваш рост',
        block: questionBlocks[1]
    },
    {
        id: 11,
        type: QuestionType.INPUT,
        description: 'Ваш вес',
        block: questionBlocks[1]
    },
    {
        id: 12,
        type: QuestionType.INPUT,
        description: 'Объем груди',
        block: questionBlocks[1]
    },
    {
        id: 13,
        type: QuestionType.INPUT,
        description: 'Объем талии',
        block: questionBlocks[1]
    },
    {
        id: 14,
        type: QuestionType.INPUT,
        description: 'Объем бедер',
        block: questionBlocks[1]
    },
    {
        id: 15,
        type: QuestionType.INPUT,
        description: 'Размер одежды верха - топы/блузы/футболки/рубашки/жакеты/куртки/пальто',
        block: questionBlocks[1],
        // options: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    },
    {
        id: 16,
        type: QuestionType.INPUT,
        description: 'Размер одежды низа - брюки/шорты/джинсы/юбки.',
        block: questionBlocks[1],
        // options: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    },
    {
        id: 17,
        type: QuestionType.INPUT,
        description: 'Размер обуви',
        block: questionBlocks[1]
    },
    {
        id: 18,
        type: QuestionType.TEXT,
        description: 'Ваш тип фигуры',
        image: 'body-type.jpeg',
        block: questionBlocks[1],
        options: [
            'Полупрямой/полуприталенный тип (талия выражена, плечи приблизительно равны бедрам по ширине)',
            'Прямой тип (талия не выражена)',
            'Приталенный/округлый тип (талия выражена, бедра шире плеч)',
            'Прямой тип, при этом плечи шире относительно бёдер',
            'Округлый тип фигуры крупного телосложения (plus size)',
            'Другое…'
        ]
    },
    {
        id: 19,
        type: QuestionType.SINGLE_OPTION,
        description: 'Мои плечи',
        block: questionBlocks[1],
        options: ['Узкие', 'Средние', 'Широкие']
    },
    {
        id: 20,
        type: QuestionType.SINGLE_OPTION,
        description: 'Мои руки',
        block: questionBlocks[1],
        options: ['Короткие', 'Средние', 'Длинные']
    },
    {
        id: 21,
        type: QuestionType.SINGLE_OPTION,
        description: 'Мой торс',
        block: questionBlocks[1],
        options: ['Короткиё', 'Средний', 'Длинный']
    },
    {
        id: 22,
        type: QuestionType.SINGLE_OPTION,
        description: 'Мои бёдра',
        block: questionBlocks[1],
        options: ['Узкие', 'Средние', 'Широкие']
    },
    {
        id: 23,
        type: QuestionType.SINGLE_OPTION,
        description: 'Мои ноги',
        block: questionBlocks[1],
        options: ['Короткие', 'Средние', 'Длинные']
    },


    {
        id: 24,
        type: QuestionType.INPUT,
        description: 'Цвет волос',
        block: questionBlocks[2]
    },
    {
        id: 25,
        type: QuestionType.INPUT,
        description: 'Цвет глаз',
        block: questionBlocks[2]
    },
    {
        id: 26,
        type: QuestionType.INPUT,
        description: 'Цвет бровей (если отличается от цвета волос):',
        block: questionBlocks[2]
    },
    {
        id: 27,
        type: QuestionType.SINGLE_OPTION,
        description: 'Цвет кожи',
        block: questionBlocks[2],
        options: [
            'Тёплый (желтый)',
            'Бледный',
            'Розовый',
            'Смуглый',
            'Тёмный',
            'Другое…'
        ]
    },
    {
        id: 28,
        type: QuestionType.TEXT,
        description: 'Ваши особенности фигуры? (длинные руки/короткая шея и т.п.)',
        block: questionBlocks[2]
    },


    {
        id: 29,
        type: QuestionType.MULTIPLE_OPTION,
        description: 'Что занимает ваше основное время? (например: работа + время с детьми + путешествия)',
        block: questionBlocks[3],
        options: [
            'Работа',
            'Учеба в школе, университете',
            'Кафе и рестораны',
            'Время с детьми',
            'Путешествия',
            'Активный отдых',
            'Торжественные мероприятия',
            'Спорт',
            'Другое…'
        ]
    },
    {
        id: 30,
        type: QuestionType.INPUT,
        description: 'Ваш обычный образ на каждый день? (Например: футболка+джинсы+пиджак+кеды)',
        block: questionBlocks[3]
    },
    {
        id: 31,
        type: QuestionType.SINGLE_OPTION,
        description: 'Ваше отношение к шопингу?',
        block: questionBlocks[3],
        options: [
            'Очень люблю, могу часами проводить время за выбором одежды',
            'Хорошо, но не хватает времени на поиски',
            'Шопинг вызывает во мне стресс, быстро устаю от поиска нужной вещи, очередей и примерок',
            'Другое…'
        ]
    },


    {
        id: 32,
        type: QuestionType.MULTIPLE_OPTION,
        description: 'Какой стиль или вещи необходимы в гардеробе?',
        block: questionBlocks[4],
        options: [
            'Классический/деловой для работы',
            'Повседневный стиль',
            'Для коктейлей/свадеб/вечерних мероприятий',
            'Для активного отдыха/спортивный',
            'Другое…'
        ]
    },
    {
        id: 33,
        type: QuestionType.TEXT,
        description: 'Ваши любимые цвета?',
        block: questionBlocks[4]
    },
    {
        id: 34,
        type: QuestionType.MULTIPLE_OPTION,
        description: 'Какой цвет украшений вы предпочитаете?',
        block: questionBlocks[4],
        options: [
            'Золотые тона',
            'Серебряные тона',
            'Розовые тона',
            'Все варианты допустимы'
        ]
    },
    {
        id: 35,
        type: QuestionType.TEXT,
        description: 'Напишите о ваших обувных предпочтениях. Какой обуви у вас больше всего? Широкая или узкая у вас нога? Есть особые требования при выборе обуви?',
        block: questionBlocks[4]
    },
    {
        id: 36,
        type: QuestionType.MULTIPLE_OPTION,
        description: 'Есть ли материалы, которые нужно исключить при подборе?',
        block: questionBlocks[4],
        options: [
            'Нет, таких материалов нет',
            'Натуральный мех',
            'Искусственный мех',
            'Натуральная кожа',
            'Искусственная кожа',
            'Шерсть',
            'Другое…'
        ]
    },
    {
        id: 37,
        type: QuestionType.MULTIPLE_OPTION,
        description: 'Часто ли вы носите обувь на каблуке? Какую высоту каблука предпочитаете?',
        block: questionBlocks[4],
        image: 'shoes.jpeg',
        options: [
            'Низкий каблук',
            'Средний каблук',
            'Высокий каблук',
            'Практически не ношу обувь на каблуке',
            'Другое…'
        ]
    },
    {
        id: 38,
        type: QuestionType.MULTIPLE_OPTION,
        description: 'Нравятся ли вам принты в одежде и если да, то какие?',
        block: questionBlocks[4],
        options: [
            'Не ношу принты',
            'Цветочный',
            'Этнический',
            'Анималистический (животный)',
            'Абстрактный',
            'Геометрический',
            'Пейсли',
            'Горошек',
            'Линия',
            'Клетка',
            'Другое…'
        ]
    },
    {
        id: 39,
        type: QuestionType.SINGLE_OPTION,
        description: 'Вы чаще носите джинсы/брюки или платья/юбки?',
        block: questionBlocks[4],
        options: [
            'Джинсы/брюки',
            'Платья/юбки',
            'В равной степени ношу и то, и другое'
        ]
    },
    {
        id: 40,
        type: QuestionType.INPUT,
        description: 'Чей стиль вам нравится?',
        block: questionBlocks[4],
    },


    {
        id: 41,
        type: QuestionType.INPUT,
        description: 'Сколько вы обычно тратите (какие суммы) на покупку верхов? (футболки/рубашки/топы)',
        block: questionBlocks[5],
    },
    {
        id: 42,
        type: QuestionType.INPUT,
        description: 'Сколько вы обычно тратите на покупку низов? (брюки/джинсы/юбки)',
        block: questionBlocks[5],
    },
    {
        id: 43,
        type: QuestionType.INPUT,
        description: 'Сколько вы обычно тратите на покупку платьев?',
        block: questionBlocks[5],
    },
    {
        id: 44,
        type: QuestionType.INPUT,
        description: 'Сколько вы обычно тратите на покупку пиджаков/верхней одежды?',
        block: questionBlocks[5],
    },
    {
        id: 45,
        type: QuestionType.INPUT,
        description: 'Сколько вы обычно тратите на покупку обуви?',
        block: questionBlocks[5],
    },
    {
        id: 46,
        type: QuestionType.MULTIPLE_OPTION,
        description: 'Ваши цели обращения к стилистам приложения?',
        block: questionBlocks[5],
        options: [
            'Новые идеи образов',
            'Экономия времени',
            'Хочу сделать себе подарок',
            'Совет экспертов',
            'Открыть для себя новые тренды',
            'Доступ к эксклюзивным брендам',
            'Найти свой индивидуальный стиль',
            'Другое…'
        ]
    },
    {
        id: 47,
        type: QuestionType.SINGLE_OPTION,
        description: 'Следите ли вы за трендами в мире моды?',
        block: questionBlocks[5],
        options: [
            'Нет',
            'Иногда',
            'Часто',
            'Другое…'
        ]
    },


    {
        id: 48,
        type: QuestionType.INPUT,
        description: 'Ваши любимые бренды? ',
        block: questionBlocks[6],
    },
    {
        id: 49,
        type: QuestionType.SINGLE_OPTION,
        description: 'Заинтересованы ли вы в подборках премиум брендов?',
        block: questionBlocks[6],
        options: [
            'Да',
            'Нет'
        ]
    },
    {
        id: 50,
        type: QuestionType.MULTIPLE_OPTION,
        description: 'Какие категории затрагивать стилистам в большей степени в подборках премиум брендов?',
        block: questionBlocks[6],
        options: [
            'Свитеры/кардиганы',
            'Футболки',
            'Брюки',
            'Джинсы',
            'Платья',
            'Пиджаки',
            'Верхняя одежда',
            'Сумки',
            'Ювелирные украшения',
            'Обувь',
            'Другое…'
        ]
    },


    {
        id: 51,
        type: QuestionType.MULTIPLE_OPTION,
        description: 'С какими трудностями вы сталкиваетесь при формировании гардероба?',
        block: questionBlocks[7],
        options: [
            'Много вещей, но нечего надеть',
            'Мои вещи перестали мне нравиться',
            'Неактуальные вещи в гардеробе',
            'Вещи не сочетаются друг с другом',
            'Нет базы гардероба',
            'Не знаю, что мне идёт',
            'Не умею выбирать правильные вещи',
            'Мне трудно собирать комплекты/цельные образы',
            'Нет времени на поиски вещей',
            'Другое…'
        ]
    },
    {
        id: 52,
        type: QuestionType.TEXT,
        description: 'Пожалуйста, напишите дополнительную информацию о себе или пожелания к работе, которые помогут стилистам создать образ для вас.',
        block: questionBlocks[7],
    },
    {
        id: 53,
        type: QuestionType.INPUT,
        description: 'Ваш аккаунт в Instagram',
        block: questionBlocks[7],
    },
]