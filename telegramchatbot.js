var request = require('request');
request('https://www.googleapis.com/books/v1/volumes?q=isbn', function (error, response, body) {
	var TelegramBot = require('node-telegram-bot-api');
	var api = "1367347703:AAGDEoxzZFIa56tgUCvN6tPOn4qZyxLGmdI"
    var bot = new TelegramBot(api, {polling: true});
    bot.on('message',function(msg) {
	    var s = msg.text
	    var str,p = 0,k = 'x';
	    if((s == "Hello" || s == "Hai" || s == "Hii") && k == 'x') {
	    	k = 'y';
	    	bot.sendMessage(msg.chat.id,"Hello Bhargavi")
	    }
	    if(k == 'y') {
	    	k = 'z';
	    	bot.sendMessage(msg.chat.id,"This chartbot is used to search information related to your required book")
	    }
	    if(k == 'z') {
	    	bot.sendMessage(msg.chat.id,"Enter the name of your required book")
	    }
	    else {
	    	for(var i = 0;i < JSON.parse(body).items.length;i++) {
  		    	if(s.toUpperCase() === (JSON.parse(body).items[i].volumeInfo.title).toUpperCase()) {               
                	str = "Information of the book you Needed : \n\n"+"Book Title : " + JSON.parse(body).items[i].volumeInfo.title + "\n\nAuthor : " + 
               		JSON.parse(body).items[i].volumeInfo.authors + 
               		"\n\nPublished Date : "+ JSON.parse(body).items[i].volumeInfo.publishedDate +  
               		"\n\nInfo Link : " + JSON.parse(body).items[i].volumeInfo.infoLink
                	p = 1
                	break
  				}
  			}
  			if(p == 0)
  				str = "Sorry!!! This Book was Not Found.You can enter other book"
  			bot.sendMessage(msg.chat.id,str)
	    }
	});   
});
		
  	