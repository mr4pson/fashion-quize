import { QuestionType, TypeQuestion, TypeQuestionBlock } from "./types";

const questionBlocks: TypeQuestionBlock[] = [
    {
        id: 1,
        title: 'Общая информация'
    },
    {
        id: 2,
        title: 'Сведения о внешности и размерах'
    },
    {
        id: 3,
        title: 'Предпочтения клиента'
    },
    {
        id: 4,
        title: 'Бюджет и сроки'
    }
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
        description: 'Дата рождения',
        block: questionBlocks[0]
    },
    {
        id: 3,
        type: QuestionType.INPUT,
        description: 'Род деятельности, профессия',
        block: questionBlocks[0]
    },
    {
        id: 4,
        type: QuestionType.INPUT,
        description: 'Страна, город проживания',
        block: questionBlocks[0]
    },
    {
        id: 5,
        type: QuestionType.SINGLE_OPTION,
        description: 'Семейное положение',
        block: questionBlocks[0],
        options: ['Замужем', 'Не замужем']
    },
    {
        id: 6,
        type: QuestionType.SINGLE_OPTION,
        description: 'Вы являетесь родителем?',
        block: questionBlocks[0],
        options: ['Да', 'Нет']
    },
    {
        id: 7,
        type: QuestionType.INPUT,
        description: 'Ваш email',
        block: questionBlocks[0]
    },
    {
        id: 8,
        type: QuestionType.INPUT,
        description: 'Ваш телефон',
        block: questionBlocks[0]
    },
    {
        id: 9,
        type: QuestionType.SINGLE_OPTION,
        description: 'Что занимает ваше основное время?',
        block: questionBlocks[0],
        options: ['Работа', 'Семья', 'Учеба', 'Спорт', 'Другое']
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
        type: QuestionType.SINGLE_OPTION,
        description: 'Размер одежды верха - топы/блузы/футболки/рубашки/жакеты/куртки/пальто',
        block: questionBlocks[1],
        options: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    },
    {
        id: 16,
        type: QuestionType.SINGLE_OPTION,
        description: 'Размер одежды низа - брюки/шорты/джинсы/юбки. Вы можете выбрать двазначения, если ваш размер промежуточный',
        block: questionBlocks[1],
        options: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
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
        description: 'Напишите о ваших предпочтениях. Носите вы обувь на каблуке? Какую высотукаблука предпочитаете? Широкая или узкая у вас нога, есть ли особые требованияпри выборе обуви? Носите вы ортопедическую обувь?',
        block: questionBlocks[1]
    },
    {
        id: 19,
        type: QuestionType.MULTIPLE_OPTION,
        description: 'Какую основную проблему вы хотите решить с помощью наших стилистов?',
        block: questionBlocks[2],
        options: ['Подобрать капсульный гардероб', 'Подобрать одежду для конкретного мероприятия', 'Подобрать украшения', 'Сэкономить время и деньги', 'Получить рекомендации стилиста']
    },
    {
        id: 20,
        type: QuestionType.INPUT,
        description: 'Для какого мероприятия вам нужны вещи (куда вы планируете в них пойти)?',
        block: questionBlocks[2]
    },
    {
        id: 21,
        type: QuestionType.TEXT,
        description: 'Какие вещи вам нужно приобрести (список вещей)?',
        block: questionBlocks[2]
    },
    {
        id: 22,
        type: QuestionType.SINGLE_OPTION,
        description: 'Размер одежды низа - брюки/шорты/джинсы/юбки. Вы можете выбрать двазначения, если ваш размер промежуточный',
        block: questionBlocks[2],
        options: ['Классический /Деловой', 'Повседневный (Кэжуал)', 'Спортивный', 'Романтический', 'Затрудняюсь ответить']
    },
    {
        id: 23,
        type: QuestionType.INPUT,
        description: 'В каких цветах вы чувствуете себя наиболее комфортно?',
        block: questionBlocks[2]
    },
    {
        id: 24,
        type: QuestionType.INPUT,
        description: 'Какие цвета преобладают в вашем гардеробе?',
        block: questionBlocks[2]
    },
    {
        id: 25,
        type: QuestionType.INPUT,
        description: 'Какие цвета вам не нравятся?',
        block: questionBlocks[2]
    },
    {
        id: 26,
        type: QuestionType.MULTIPLE_OPTION,
        description: 'Какие утверждения про вас?',
        block: questionBlocks[2],
        options: ['Люблю облегающий крой одежды', 'Люблю свободный крой одежды (oversize)', 'Люблю полуприлегающий силуэт', 'Мне нравятся однотонные вещи', 'Мне нравятся яркие цвета в одежде', 'Мне нравятся разные принты', 'Предпочитаю минимализм в одежде', 'Предпочитаю классический стиль одежды', 'Предпочитаю повседневный (кэжуал) стиль одежды', 'Предпочитаю спортивный стиль одежды', 'Люблю носить украшения и аксессуары', 'Не люблю и не ношу украшения и аксессуары', 'Не ношу украшения и аксессуары, но хотела бы', 'Люблю и ношу вещи только из натуральных тканей', 'Не обращаю внимание на состав тканей', 'Всегда слежу за модой и обязательно приобретаю трендовые вещи', 'Не слежу за модой и не ношу трендовые вещи', 'Чаще ношу вещи из масс-маркета', 'Ношу только люксовые бренды одежды', 'Хочу привлекать внимание. Вещи должны быть брендовыми', 'Не хочу лишнего внимания', 'Люблю мини', 'Люблю миди', 'Люблю макси', 'Предпочитаю юбки и платья брюкам и джинсам', 'Предпочитаю брюки и джинсы юбками и платьям', 'Я чаще за рулем', 'Я много хожу и передвигаюсь на общественном транспорте', 'Мне важно выглядеть женственно', 'Мне важно выглядеть солидно/респектабельно', 'Люблю экспериментировать в одежде', 'Не люблю эксперименты в одежде', 'В моем гардеробе много вещей, которые не сочетаются друг с другом', 'Я подбираю капсулы, поэтому в моем гардеробе нет ненужных вещей']
    },
    {
        id: 27,
        type: QuestionType.SINGLE_OPTION,
        description: 'Что для вас максимально важно?',
        block: questionBlocks[2],
        options: ['Мода / тренды', 'Индивидуальный стиль', 'Практичность и удобство']
    },
    {
        id: 28,
        type: QuestionType.INPUT,
        description: 'Есть ли предметы одежды, которые вы никогда не наденете ни при какихусловиях?',
        block: questionBlocks[2]
    },
    {
        id: 29,
        type: QuestionType.INPUT,
        description: 'Есть ли ограничения в подборе образа?',
        block: questionBlocks[2]
    },
    {
        id: 30,
        type: QuestionType.SINGLE_OPTION,
        description: 'Какой цвет украшений вы предпочитаете?',
        block: questionBlocks[2],
        options: ['Золотые тона', 'Серебренные тона', 'Смешанные']
    },
    {
        id: 31,
        type: QuestionType.SINGLE_OPTION,
        description: 'Какие категории вещей, вы бы хотели исключить из подборки?',
        block: questionBlocks[2],
        options: ['Футболки', 'Рубашки', 'Пиджаки', 'Куртки', 'Пальто', 'Брюки', 'Джинсы', 'Шорты', 'Платья', 'Юбки', 'Сумки', 'Шарфы', 'Сережки', 'Ожерелья', 'Браслеты', 'Браслеты']
    },
    {
        id: 32,
        type: QuestionType.SINGLE_OPTION,
        description: 'Какой тип обуви, вы хотели бы исключить из подборки?',
        block: questionBlocks[2],
        options: ['Обувь на каблуках', 'Обувь на танкетке', 'Обувь на плоской подошве']
    },
    {
        id: 33,
        type: QuestionType.SINGLE_OPTION,
        description: 'Какие принты вы предпочитаете носить?',
        block: questionBlocks[2],
        options: ['Анималистический', 'Геометрический', 'Цветочный', 'Этнический', 'Абстрактный', 'Не ношу принты']
    },
    {
        id: 34,
        type: QuestionType.SINGLE_OPTION,
        description: 'Какие материалы, вы хотели бы исключить при подборе?',
        block: questionBlocks[2],
        options: ['Натуральный мех', 'Искусственный мех', 'Натуральная кожа', 'Искусственная кожа', 'Шерсть', 'Синтетика (полиамид, акрил, полиэстер, вискоза)', 'Готова рассмотреть разные материалы']
    },
    {
        id: 35,
        type: QuestionType.SINGLE_OPTION,
        description: 'Как часто вы покупаете одежду?',
        block: questionBlocks[3],
        options: ['Несколько раз в месяц', 'Раз в сезон', 'Несколько раз в год', 'Менее часто']
    },
    {
        id: 36,
        type: QuestionType.SINGLE_OPTION,
        description: 'Как часто вы покупаете одежду?',
        block: questionBlocks[3],
        options: ['Не люблю', 'Нормально', 'Обожаю']
    },
    {
        id: 37,
        type: QuestionType.INPUT,
        description: 'Сколько времени вы готовы потратить на поход по магазинам?',
        block: questionBlocks[3]
    },
    {
        id: 38,
        type: QuestionType.INPUT,
        description: 'Какой бюджет вы готовы выделить на покупку вещей?',
        block: questionBlocks[3]
    },
    {
        id: 39,
        type: QuestionType.INPUT,
        description: 'В какое время вам удобнее запланировать шопинг (будни/выходные, утро/обед/вечер)?',
        block: questionBlocks[3]
    },
    {
        id: 40,
        type: QuestionType.SINGLE_OPTION,
        description: 'Сколько вы обычно тратите на верхнюю одежду (пальто, куртки, плащи, пуховики, куртки)?',
        block: questionBlocks[3],
        options: ['2000-5000р', '5000-10000р', '10000р+']
    },
    {
        id: 41,
        type: QuestionType.SINGLE_OPTION,
        description: 'Сколько вы обычно тратите на легкие верха (блейзеры, блузки, водолазки,джемперы, свитеры, платья, рубашки, свитшоты)?',
        block: questionBlocks[3],
        options: ['2000-5000р', '5000-10000р', '10000р+']
    },
    {
        id: 42,
        type: QuestionType.SINGLE_OPTION,
        description: 'Сколько вы обычно тратите на низы (брюки/шорты/джинсы/юбки)?',
        block: questionBlocks[3],
        options: ['2000-5000р', '5000-10000р', '10000р+']
    },
    {
        id: 43,
        type: QuestionType.SINGLE_OPTION,
        description: 'Сколько вы обычно тратите на обувь?',
        block: questionBlocks[3],
        options: ['1000-2000р', '2000-5000р', '5000-10000р', '10000р+']
    },
    {
        id: 44,
        type: QuestionType.SINGLE_OPTION,
        description: 'Сколько вы обычно тратите на аксессуары и украшения?',
        block: questionBlocks[3],
        options: ['1000-2000р', '2000-5000р', '5000-10000р', '10000р+', 'Не покупаю украшения и аксессуары']
    },
    {
        id: 45,
        type: QuestionType.SINGLE_OPTION,
        description: 'Как часто вы приобретаете трендовые вещи?',
        block: questionBlocks[3],
        options: ['Редко', 'Иногда', 'Часто']
    },
    {
        id: 46,
        type: QuestionType.SINGLE_OPTION,
        description: 'Как часто вы приобретаете трендовые вещи?',
        block: questionBlocks[3],
        options: ['H&M', 'TOPSHOP', 'BERSHKA', 'ZARA', 'KALVIN KLEIN', 'STRADIVARIUS', 'ZARINA', 'MASSIMO DUTTI', 'LIME', '12STOREEZ', 'FINN FLARE', 'MANGO', 'MARKS & SPENCER', 'PULL & BEAR', 'TOM TAILOR', 'TOMMY HILFIGER', 'TOMMY HILFIGER', 'UNIQLO', 'Другое']
    },
    {
        id: 47,
        type: QuestionType.INPUT,
        description: 'Где вы обычно покупаете одежду, обувь и аксессуары? Перечислите названия ваших любимых магазинов/брендовю',
        block: questionBlocks[3]
    },
    {
        id: 48,
        type: QuestionType.SINGLE_OPTION,
        description: 'На какой сезон вам необходимо подобрать гардероб?',
        block: questionBlocks[3],
        options: ['Зима', 'Весна', 'Лето', 'Осень', 'Весна-Лето', 'Осень-зима']
    },
    {
        id: 49,
        type: QuestionType.TEXT,
        description: 'Пожалуйста, напишите дополнительную информацию о себе или пожелания к работе, которые помогут стилисту создать ваш идеальный и неповторимый образ.',
        block: questionBlocks[3]
    },
]