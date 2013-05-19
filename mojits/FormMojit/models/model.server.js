YUI.add('FormMojitModel', function(Y, NAME) {
  var API_KEY = '{84921e87fb8f2fc338c3ff9bf51a412e}';
  Y.namespace('mojito.models')[NAME] = {
   init: function(config) {
	this.config=config;
	this.fs=require("fs");
   },
   
   readFile: function(path,callback) {
	var me=this;
	var cache="";
	var sep=" ";
	var jsonObj=[];
	Y.log("file path: "+path);
	var stream=me.fs.createReadStream(path);
	stream.on('data', function(data){
	   Y.log("start reading data blablablabla");
	   cache+=data;
	   var lines=me.getLinesFromStream(cache),
	   fullLine=lines.lines;
	   cache=lines.remain;
	   if(fullLines.length>0){
	      fullLines.forEach(function(line){
		var lineAttrs=line.split(sep),
		lineObj;
		lineObj={};
		me.fieldIdx.forEach(function(item){
		   lineObj[item.key]=lineAttrs[item.value];
		});   
		jsonObj.push(lineObj);
	      });
	   }
	}).on('close', function(){
	   me.fs.unlink(path);
	   callback(jsonObj);
	   Y.log(jsonObj);
	}).on('error',function(err){
	   callback({errmsg: "parsing file error:"+err});
	   Y.log("error: parsing file error");
	});
   },
   
   getData: function(callback) {
	callback({some:'data'});
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
