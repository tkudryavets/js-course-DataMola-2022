const myModule = (function() {
    let user = 'Кудрявец Татьяна';
    let commentsLastID = 30;
      

    function getTweets(skip = 0, top = 10, filterConfig = {}){
        if(typeof skip !== 'number' || typeof top !== 'number')
            return console.log('Ошибка ввода данных в фильтр');
        
        let paginationTweets = tweets;
      
        if(filterConfig !== {}){
            const keys = Object.keys(filterConfig);
            for (const filter of keys) {
                switch (filter){
                    case 'author':
                        for(let i = 0; i < paginationTweets.length; i++){
                            if(paginationTweets[i].author !== filterConfig[filter]){
                                paginationTweets.splice(i,1);
                                i--;
                            }
                        }
                        break;

                    case 'dateFrom':
                        for(let i = 0; i < paginationTweets.length; i++){
                            if(paginationTweets[i].createdAt.getTime() <  filterConfig[filter].getTime()){
                                paginationTweets.splice(i,paginationTweets.length-i);
                            }
                        }
                        break;

                    case 'dateTo':
                        for(let i = 0; i < paginationTweets.length; i++){
                            if(paginationTweets[i].createdAt.getTime() >  filterConfig[filter].getTime()){
                                paginationTweets.splice(i,1);
                                i--;
                            }
                        }
                        break;

                    case 'hashtags':
                        for(let i = 0; i < filterConfig[filter].length; i++){
                            for(let j = 0; j < paginationTweets.length; j++){
                                if(paginationTweets[j].text.indexOf('#'+filterConfig[filter][i]) === -1){
                                    paginationTweets.splice(j,1);
                                    j--;
                                }
                            }
                        }
                        break;

                    case 'text':
                        for(let i = 0; i < paginationTweets.length; i++){
                            if(paginationTweets[i].text.indexOf(filterConfig[filter]) === -1){
                                paginationTweets.splice(i,1);
                                i--;
                            }
                        }
                }
            }
        }
        if(paginationTweets.length < skip+top)
            paginationTweets = paginationTweets.slice(skip, tweets.length);
        else paginationTweets = paginationTweets.slice(skip, top);

        return paginationTweets;
    } 

    function getTweet(id){
        for(let i=0; i<tweets.length && tweets[i].id >= id; i++){
            if(tweets[i].id === id){
                return tweets[i];
            }
        } 
        return console.log(`Твит с ID=${id} не найден`);
    }
    function validateTweet(tw){
        if(Object.keys(tw).length !== 5)
            return false;

        for (const key in tw) {
            if (Object.hasOwnProperty.call(tw, key)) {
                const element = tw[key];
                switch(key){
                    case 'id': 
                        if(+element <= 0){
                            return false;
                        }
                        break;  

                    case 'text': 
                        if(typeof element !== 'string' || element.length == 0){
                            return false;
                        }
                        if(element.length>280)
                            return false;
                        break;

                    case 'createdAt': 
                        if(!element.getFullYear()){
                            return false;
                        }
                        break; 

                    case 'author':
                        if(typeof element !== 'string' || element.length == 0){
                            return false;
                        }
                        break;
                    
                    case 'comments':
                        for(let i=0; i<element.length; i++){
                            if(!validateComment(element[i]))
                                return false;
                        }
                        break;
                    default: return false;
                }
            }
            else return false;
        }
        return true;
    }

    function addTweet(text){
        let lastID = +tweets[0].id + 1;
        if(text.length <= 280){
            let tw = {
                id: lastID.toString(),
                text: text,
                createdAt: new Date(),
                author: user,
                comments: [],
            };
            tweets.unshift(tw);
            return true;

        }
        return false;
    }

    function editTweet(id, text){
        if(text.length <= 280){
            for(let i=0; i<tweets.length && tweets[i].id >= id; i++){
                if(tweets[i].id === id){
                    tweets[i].text = text;
                    return true;
                }
            }
        }
        return false;
    }

    function removeTweet(id){
        for(let i = 0; i < tweets.length && tweets[i].id >= id; i++){
            if(tweets[i].id === id){
                tweets.splice(i,1);
                return true;
            }
        }      
        return false;
    }

    function validateComment(com){
        if(Object.keys(com).length !== 4)
            return false;
        for (const key in com) {
            if (Object.hasOwnProperty.call(com, key)) {
                const element = com[key];
                switch(key){
                    case 'id': 
                        if(+element <= 0){
                            return false;
                        }
                        break;  

                    case 'text': 
                        if(typeof element !== 'string' || element.length == 0){
                            return false;
                        }
                        if(element.length>280){
                            return false;
                        }
                        break;

                    case 'createdAt': 
                        if(!element.getFullYear()){
                            return false;
                        }
                        break; 

                    case 'author':
                        if(typeof element !== 'string' || element.length == 0){
                            return false;
                        }
                        break;
                    
                    default: return false;
                }
            }
            else return false;
        }
        return true;
    }

    function addComment(id, text){
        for(let i = 0; i < tweets.length && tweets[i].id >= id; i++){
            if(tweets[i].id === id){
                const com = {
                    id: (commentsLastID+1) + "",
                    text: text,
                    createdAt: new Date(),
                    author: user,
                }
                if(validateComment(com)){
                    tweets[i].comments.push(com);
                    commentsLastID++;
                    return true; 
                }
                else return false;
            }
        }   
        return false;   
    }
    
    function changeUser(usr){
        user = usr;
    }

    return{
        getTweets,
        getTweet,
        validateTweet,
        addTweet,
        editTweet,
        removeTweet,
        validateComment,
        addComment,
        changeUser, 
    };
    })();

    
    //Твит с неправильным коммментарием
    // const wrongTweet = { 
        //     id: '1',
        //     text: 'Неприятно( У меня была такая же ситуация',
        //     createdAt: new Date('2022-03-11'),
        //     author: 'nnn', 
        //     comments: [
            //         {
                //             id: '27',
                //             text: 'Неприятно( У меня была такая же ситуация',
                //             author: 'Шакун Маша', 
                //         },
                //     ],
                // }
                //console.log(myModule.validateTweet(wrongTweet));
            
        
    // myModule.removeTweet('16');
    // myModule.removeTweet('16');
    // myModule.addComment('16', 'Думай медленно решай быстро');
    // console.log(myModule.getTweet('16')?.comments);
    
    // myModule.addTweet('Hello my name is Tanya');
            
            
    // получение твитов с фильтром
    // let arrTweets = myModule.getTweets(0,10,
    //     {dateFrom: new Date('2022-03-11T16:06:04'), 
    //     dateTo: new Date('2022-03-11T18:00:04'),
    //     hashtags: [''],
    //     text: 'курс',
    //     author: 'Воробьева Агата',
    //     }
    //     );

    //вывод отфильтрованного         
    // for (const key in arrTweets) {
    //     if (Object.hasOwnProperty.call(arrTweets, key)) {
    //         const element = arrTweets[key];
    //         console.log(element.id+" "+element.createdAt+" "+element.text);
    //     }
    // }