YUI.add('yqlMojitModel', function(Y, NAME) {
  var API_KEY = '{84921e87fb8f2fc338c3ff9bf51a412e}';

  Y.namespace('mojito.models')[NAME] = {
   init: function(config) {
	
	this.config=config;
	this.fs=require("fs");
	
	
   },

    getData:function(word,startDate,endDate,callback){
	var me=this;
	var TEST_TABLE = 'query';
	
	var mysql=require("mysql");

	var mysqlClient=mysql.createConnection({
	   host:'localhost',port:'3306',
	   user:'root',
	   password:'',
	   database:'y4'
	});

	mysqlClient.connect(function(error, results) {
	if(error) {
		console.log('Connection Error: ' + error.message);
		return;}
	});

	var values = [word,startDate,endDate];
	var query='SELECT city_id,rate FROM query  where keyword= ? and ?<time<?';
	
	mysqlClient.query(
	   'SELECT city_id,rate FROM query  where keyword= ? and ?<time<?',values,
	   function selectCb(err, results, fields) {
	   if (err) {
	   console.log(err);
	   mysqlClient.end();
	   throw err;
	   }

	   console.log(results);
	   console.log(fields);
	   var data="id\trate\n";
	   for(var i in results){
		data+=results[i].city_id+"\t";
		data+=results[i].rate/100000+"\n";
	   }
	   
	   Y.log(data);
	   mysqlClient.end();
	   callback(data);
	   });

	
    },
   
    search: function (search, start, count, callback) {
      if (null == search || 0 == search.length) {
        callback([]);
      }
      start /= 1; count /= 1;
//      var select = 'select * from '+ 'flickr.photos.search ' + '(' + (start || 0) + ',' + (count || 20) + ') ' + 'where '+ 'text="%' + (search || 'muppet') + '%" and api_key="' + API_KEY + '"';
      var select='select * from flickr.photos.search where has_geo="true" and text="newyork" and api_key="84921e87fb8f2fc338c3ff9bf51a412e"';
      Y.YQL (select, function(rawYql) {
        if (null == rawYql || 0 == rawYql.query.count) {
          callback ([]);
        }
        var photos = [], item = null;
        if ( !rawYql.query.results.photo.length ) {
          rawYql.query.results.photo = [
            rawYql.query.results.photo
          ];
        }
        for (var i=0; i < 1; i++) {
          item = rawYql.query.results.photo[i];
          item.url = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg';
          item.title = (!item.title) ? search + ':' + i : item.title;
	  
          photos.push ({id:item.id, title:item.title, url:item.url});
        }
        callback (photos);
      });
    }
  };
}, '0.0.1', {requires: ['mojito','yql']});
