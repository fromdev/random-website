var maxLinksPerFeed = 5;
var techBlogsList = [
		'https://en.wikipedia.org/wiki/Special:RandomInCategory/Computer_programming',
		'http://www.howstuffworks.com/random-article',
		'http://www.wikihow.com/Special:Randomizer',
		'http://www.fromdev.com/random',
		'https://www.ted.com/surpriseme?minutes=30&talks=1704&token=jR3EYgs3mNXSVw%2FKGXR5yg%3D%3D&rating_word_id=9'
		];
		
var feedsList = new Array();
var addToFeedsList = function(arr) {
	for(var i in arr) {
		feedsList.push(arr[i]);
	}
};
var allUrls = new Array();
var addToAllUrls = function(arr) {
	for(var i in arr) {
		allUrls.push(arr[i]);
	}
};

var searchFeedsUrl = 'https://ajax.googleapis.com/ajax/services/feed/find?v=1.0&callback=loadFeedSuccess&q=Java%20Blogs';
var ajaxApiLoadFeedBaseUrl = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=loadFeedSuccess&q=' 

$(window).load(function(){
		var feedToUrlList = function(feedUrl,loadFeedSuccess) {
			$.ajax({
				type: 'GET',
				url: ajaxApiLoadFeedBaseUrl + feedUrl,
				async: false,
				jsonpCallback: 'loadFeedSuccess',
				contentType: "application/json",
				dataType: 'jsonp',
				success: loadFeedSuccess,
				error: function(e) {
				   console.log('error ' + e.message);
				}
			});
		};
		var extractUrlsFromFeed = function(json) {
       		console.dir(json.responseData.feed);
       		var allEntriesInFeed = json.responseData.feed.entries;
       		for(var entry in allEntriesInFeed) {
       			if(entry < maxLinksPerFeed) {
       				allUrls.push(allEntriesInFeed[entry].link);
       				//console.log('adding ' + allEntriesInFeed[entry].link);
       			} else {
       				break;
       			}
       		}
      	 	
    	};
    	var pickRandom = function (arr) {
        	return arr[getRandomInt(0,arr.length)];
        };
        var getRandomInt = function (min, max) {
  			return Math.floor(Math.random() * (max - min)) + min;
		};
	var refUrl = function() {
		return pickRandom(allUrls);
	};
	var removeUrl = function(toRemove) {
		for(var i = allUrls.length-1; i--;){
			if (allUrls[i] === toRemove) allUrls.splice(i, 1);
		}
	};	
	var reload = function() {
		$('#main').attr('src',refUrl);
	};
	$('#next').click(reload);
	for(var aFeedUrl in feedsList) {
		console.log('loading ' + feedsList[aFeedUrl]);
		feedToUrlList(feedsList[aFeedUrl],extractUrlsFromFeed);
	}
	addToAllUrls(techBlogsList);
	reload();
});
