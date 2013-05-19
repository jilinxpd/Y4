
<script type='text/javascript'>
	function input(keyword,time_min,time_max){
		var start_time = time_min;
		var end_time = time_max;

		var file ='http://query.yahooapis.com/v1/public/yql?q=use%20%22https%3A%2F%2Fraw.github.com%2Fyesboyhongtai%2Fyql-data%2Fmaster%2Fyql-kf.xml%22%20as%20kf%3B%20select%20%20file_id%20from%20kf%20where%20keyword%3D%22'+keyword+'%22%3B%20%0A&format=json&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback=cbfunc';
		document.write("<script> "+file+" <\/script>");


		var src='http://query.yahooapis.com/v1/public/yql?q=use%20%22'+file+'%22%20as%20kf%3B%20select%20%20state_id%2Ccity_id%2Crate%20from%20kf%20where%20keyword%3D%22'+keyword+'%22%3B%20%0A&format=json&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback=cbfunc2';
		document.write("<script> "+src+" <\/script>");
	
	}
	function cbfunc(o){
	var items = o.query.results.Query;
	var output = '';
	var no_items=items.length;

	
	for(var i=0;i<no_items;i++){
		var file_id = items[i].file_id;
		}

	}
	function cbfunc2(o){
	var items = o.query.results.Query;
	var output = '';
	var no_items=items.length;

	
	for(var i=0;i<no_items;i++){
		var state_id = items[i].state_id;
		var city_id = items[i].city_id;
		var rate = items[i].rate;
		}

	}
</script>
