const tweetsSize = 22;
const tweets = [
    {
       id: '1',
       text: 'Привет! #js #datamola',
       createdAt: new Date('2022-03-09T23:00:00'),
       author: 'Иванов Иван',
       comments: [],
  
    },
    {
       id: '2',
       text: 'Как дела?',
       createdAt: new Date('2022-03-09T23:00:01'),
       author: 'Петров Петр',
       comments: [
            {
            id: '1',
            text: 'Хорошо, а у тебя?',
            createdAt: new Date('2022-03-09T23:00:05'),
            author: 'Иванов Иван',
            }
        ],
    },
    {
        id: '3',
        text: 'Подскажите торговые центры в Мюнхене',
        createdAt: new Date('2022-03-10T13:00:00'),
        author: 'Сорокина Лена',
        comments: [
            {
                id: '2',
                text: 'Kaufingertor Passage',
                createdAt: new Date('2022-03-10T13:05:05'),
                author: 'Воробьева Агата',
            },
            {
                id: '3',
                text: 'Pasing Arcaden',
                createdAt: new Date('2022-03-10T13:05:05'),
                author: 'Шакун Маша', 
            },
            {
                id: '4',
                text: 'Hofstatt',
                createdAt: new Date('2022-03-10T13:05:05'),
                author: 'Кураев Алексей', 
            }
        ],
   
     },
     {
        id: '4',
        text: 'Где можно снять жилье недорого?',
        createdAt: new Date('2022-03-10T14:15:40'),
        author: 'Воробьева Агата',
        comments: [
            {
                id: '5',
                text: 'В пригороде',
                createdAt: new Date('2022-03-10T14:25:05'),
                author: 'Шакун Маша', 
            },
            {
                id: '6',
                text: 'Найди себе парня с жильем',
                createdAt: new Date('2022-03-10T14:31:08'),
                author: 'Кураев Алексей', 
            }
        ],
   
     },
     {
        id: '5',
        text: 'Если бы тут были картинки, я бы выложил свою собаку #люблюсобак',
        createdAt: new Date('2022-03-10T15:01:04'),
        author: 'Кураев Алексей',
        comments: [],
   
     },
     {
        id: '6',
        text: 'Переходите все на мой тг канал)))#покаInstagram',
        createdAt: new Date('2022-03-10T15:44:04'),
        author: 'Иванова Анастасия',
        comments: [],
     },
     {
        id: '7',
        text: 'Как найти работу, если все уезжают???#help',
        createdAt: new Date('2022-03-11T10:10:10'),
        author: 'Кудрявец Таня',
        comments: [
            {
                id: '7',
                text: 'Но ты ведь тоже можешь уехать...',
                createdAt: new Date('2022-03-11T10:15:10'),
                author: 'Шакун Маша',    
            },
            {
                id: '8',
                text: 'Чтобы уехать нужна работа))',
                createdAt: new Date('2022-03-11T10:17:11'),
                author: 'Кудрявец Таня',    
            }
        ],
   
     },
     {
        id: '8',
        text: 'Я хотела уехать в Грузию, а сестра раскрасила мой паспорт #печаль#потрачено',
        createdAt: new Date('2022-03-11T15:44:04'),
        author: 'Шакун Маша',
        comments: [],
   
     },
     {
        id: '9',
        text: 'На каком языке ты пишешь?',
        createdAt: new Date('2022-03-11T15:44:05'),
        author: 'Славный Слава',
        comments: [
            {
                id: '12',
                text: 'JS',
                createdAt: new Date('2022-03-11T15:45:05'),
                author: 'Иванов Иван',
            },
            {
                id: '13',
                text: 'C#',
                createdAt: new Date('2022-03-11T15:46:05'),
                author: 'Иванова Анастасия',    
            },
            {
                id: '14',
                text: 'JS',
                createdAt: new Date('2022-03-11T15:47:05'),
                author: 'Кудрявец Таня',    
            },
            {
                id: '15',
                text: 'C++',
                createdAt: new Date('2022-03-11T15:48:05'),
                author: 'Петров Петр',
            },
            {
                id: '16',
                text: 'Java',
                createdAt: new Date('2022-03-11T15:49:05'),
                author: 'Пупкин Макар',    
            },
            {
                id: '17',
                text: 'Java',
                createdAt: new Date('2022-03-11T15:50:05'),
                author: 'Булгакова Мира',
            }
        ],
   
     },
     {
        id: '10',
        text: 'Срочная замена паспорта стоит 100р... Грузия, жди меня! #timeforhachapury',
        createdAt: new Date('2022-03-11T15:55:04'),
        author: 'Шакун Маша',
        comments: [],
   
     },
    
     {
        id: '11',
        text: 'EPAM закрыл набор белоруссов... А я успел!#success',
        createdAt: new Date('2022-03-11T16:00:04'),
        author: 'Пупкин Макар',
        comments: [],
   
     },
     {
        id: '12',
        text: 'Читаю книжку про искусство и пью вино #жизньхороша',
        createdAt: new Date('2022-03-11T16:01:04'),
        author: 'Кураев Алексей',
        comments: [
            {
                id: '9',
                text: 'Лёша, ещё только 4 часа дня!',
                createdAt: new Date('2022-03-11T10:15:10'),
                author: 'Шакун Маша',    
            }
        ],
     },
     {
        id: '13',
        text: '#StopWar#prayforukraine',
        createdAt: new Date('2022-03-11T16:05:04'),
        author: 'Булгакова Мира',
        comments: [],
     },
     
     {
        id: '14',
        text: 'Препод по философии душнила',
        createdAt: new Date('2022-03-11T16:11:04'),
        author: 'Петров Петр',
        comments: [
            {
                id: '10',
                text: 'У меня была вчера у нее пара. Ужасно',
                createdAt: new Date('2022-03-11T16:15:10'),
                author: 'Шакун Маша',    
            },
            {
                id: '11',
                text: 'Так просто не ходи на пары))',
                createdAt: new Date('2022-03-11T16:16:11'),
                author: 'Славный Слава',    
            }
        ],
     },
    
     {
        id: '15',
        text: 'Знаешь ли ты?',
        createdAt: new Date('2022-03-11T16:44:04'),
        author: 'Славный Слава',
        comments: [
            {
                id: '18',
                text: 'Вдоль ночных дорог',
                createdAt: new Date('2022-03-11T16:45:04'),
                author: 'Иванов Иван',
            },
            {
                id: '19',
                text: 'Шла босиком, не жалея ног',
                createdAt: new Date('2022-03-11T16:46:04'),
                author: 'Иванова Анастасия',    
            },
            {
                id: '20',
                text: 'Сердце его теперь в твоих руках',
                createdAt: new Date('2022-03-11T16:47:04'),
                author: 'Кудрявец Таня',    
            },
            {
                id: '21',
                text: 'Не потеряй его и не сломай',
                createdAt: new Date('2022-03-11T16:48:04'),
                author: 'Петров Петр',
            },
            {
                id: '22',
                text: 'Чтоб не нести вдоль ночных дорог',
                createdAt: new Date('2022-03-11T16:49:04'),
                author: 'Пупкин Макар',    
            },
        ],
     },
     {
        id: '16',
        text: 'Посоветуйте что почитать',
        createdAt: new Date('2022-03-11T16:50:04'),
        author: 'Шакун Маша',
        comments: [
            {
                id: '23',
                text: 'Книжку',
                createdAt: new Date('2022-03-11T16:52:54'),
                author: 'Иванов Иван',
            },
            {
                id: '24',
                text: 'Портрет Дориана Грея',
                createdAt: new Date('2022-03-11T16:55:08'),
                author: 'Иванова Анастасия',    
            },
            {
                id: '25',
                text: 'Вино из одуванчиков',
                createdAt: new Date('2022-03-11T16:56:30'),
                author: 'Кудрявец Таня',    
            },
            {
                id: '26',
                text: '&#3410 негритят&#34, если любишь детективы. Если понравится то можно еще &#34Убийства по алфавиту&#34, &#34Смерть на Ниле&#34',
                createdAt: new Date('2022-03-11T17:00:01'),
                author: 'Петров Петр',
            },
        ],
   
     },
     {
        id: '17',
        text: 'Как провести оплату в интернет-сервисе, если Mastercard и Visa не работуют? #санкции#вопрос',
        createdAt: new Date('2022-03-11T16:52:54'),
        author: 'Иванов Иван',
        comments: [],
   
     },
     {
        id: '18',
        text: 'Поменяла доллары, а курс упал #fail',
        createdAt: new Date('2022-03-11T17:00:11'),
        author: 'Воробьева Агата',
        comments: [
            {
                id: '27',
                text: 'Неприятно( У меня была такая же ситуация',
                createdAt: new Date('2022-03-11T17:02:11'),
                author: 'Шакун Маша', 
            },
        ],
     },
     {
        id: '19',
       text: 'Посоветуйте ресурсы для изучения js',
       createdAt: new Date('2022-03-11T17:30:11'),
       author: 'Иванов Иван',
       comments: [
            {
            id: '28',
            text: 'https://learn.javascript.ru',
            createdAt: new Date('2022-03-11T17:35:11'),
            author: 'Кудрявец Таня',    
            },
            {
            id: '29',
            text: 'Codewars',
            createdAt: new Date('2022-03-11T17:37:11'),
            author: 'Шакун Маша', 
            },
            ],
     },
     {
        id: '20',
        text: 'Наконец весна и стало теплее! Утренние пробежки, ждите меня #спорт',
        createdAt: new Date('2022-03-11T17:55:04'),
        author: 'Сорокина Лена',
        comments: []
     },
     {
        id: '22',
        text: 'Кто хочет вечером встретиться на чашечку чая - пишите в комментарии!',
        createdAt: new Date('2022-03-11T18:18:18'),
        author: 'Кураев Алексей',
        comments: [
            {
            id: '30',
            text: 'хэллоу,, итс ми',
            createdAt: new Date('2022-03-11T18:21:02'),
            author: 'Булгакова Мира',  
            }
        ],
     },
     {
        id: '21',
        text: 'Сходила на Бетмена.Как же женщина-кошка хороша!',
        createdAt: new Date('2022-03-11T18:00:04'),
        author: 'Иванова Анастасия',
        comments: [],
   
     },
    
  ];
  
  tweets.sort(function(a,b){
      return b.createdAt.getTime()- a.createdAt.getTime();
  });

  