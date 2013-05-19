YUI.add('FormMojitBinderIndex', function(Y, NAME) {

    Y.namespace('mojito.binders')[NAME] = {

        init: function(mojitProxy) {
            this.mp = mojitProxy;
        },

        bind: function(node) {

var width = 960,
    height = 500;

var cityRateById = d3.map();
var stateRateById = d3.map();

var quantize= d3.scale.quantize()
    .domain([0, .15])
    .range(d3.range(9).map(function(i) { return "q" + i; }));

var quantize2=d3.scale.quantize()
.domain([0, .15]).range(d3.range(5000,0,-500));

var path = d3.geo.path();

var svg = d3.select('body').append("svg")
    .attr("width", width)
    .attr("height", height);


var radius = d3.scale.sqrt()
.domain([0,1e6])
.range([0,10]);

var g_us;
var g_centroids;
var tiers;
var bubbles;
var location_names;

var visual_style=0;
var us_states=0;

var floating_label;

queue()
    .defer(d3.json, "/static/FormMojit/assets/us-cities-loc.json")
    .defer(d3.json, "/static/FormMojit/assets/us-states-loc.json")
    .await(ready);





function deleteAll(){
if(tiers!=undefined&&!tiers.empty()){
tiers.remove();
}
if(bubbles!=undefined&&!bubbles.empty()){
bubbles.remove();
}
if(location_names!=undefined&&!location_names.empty()){
location_names.remove();
}
}


function displayTier(us, centroids){
deleteAll();

 tiers=svg.append("g")
.attr("id","tiers");

var tier=tiers.selectAll("path")
.data(topojson.feature(us, us.objects.counties).features)
.enter()
.append("path");

tier.attr("d", path).attr("class","q_white")
.transition().duration(1000).delay(function(d, i){ return quantize2(cityRateById.get(d.id)); })
.attr("class",function(d) { var rate=cityRateById.get(d.id); return rate==undefined?"q_white":quantize(rate); })
}


function displayBubble(us, centroids){
deleteAll();

 bubbles=svg.append("g")
.attr("id","bubble");

var bubble = bubbles.selectAll("path")
.data(centroids.features)
.enter()
.append("path")
.attr("class","symbol");

bubble.attr("d",path.pointRadius(0))
.transition().duration(1000).delay(function(d, i){ return i*100; })
.attr("d",path.pointRadius(function(d) { return radius(stateRateById.get(d.id)); }));

bubble.on("mouseover", function(d) {
var loc=d3.mouse(this);
floating_label
.attr("x",loc[0])
.attr("y",loc[1])
.text(d.properties.name);
});

bubble.on("mouseout", function(d) {
floating_label
.text(null);
});

}


function ready(error, us, centroids) {

g_us=us;
g_centroids=centroids;

svg.append("g").append("path")
      .datum(topojson.feature(g_us, g_us.objects.states))
      .attr("class", "states")
      .attr("d", path);

}



function clickActionSearch(){

queue().
defer(d3.tsv, "/static/FormMojit/assets/states.tsv", function(d) { stateRateById.set(d.id, +d.rate); })
.await(refreshDisplay);

queue().
defer(d3.tsv, "/static/FormMojit/assets/cities.tsv", function(d) { cityRateById.set(d.id, +d.rate); });

}

function refreshDisplay(){
display(0);
}

function display(visual_style) {

if(visual_style==0){
displayBubble(g_us, g_centroids);
}else{
displayTier(g_us, g_centroids);
}

floating_label=svg.append("g").append("text")
.attr("class","locationname")
}


	    var me=this;
	    var mp=this.mp;
	    this.node = node;
	    var startDate,endDate,word;
            var words=[
'Beyonce',
'Mega Millions',
'Warriors',
'Preakness 2013',
'Dick Trickle',
'Candice Glover',
'The Office',
'Granbury Texas',
'Aretha Franklin',
'Bruins',
'David Beckham',
'Grey\'s Anatomy',
'Knicks',
'Jessie J',
'Memphis Grizzlies',
'Gillian Anderson',
'Wade Robson',
'Powerball',
'Powerball Numbers',
'American Idol 2013',
'Plumber',
'American Idol',
'Miami Heat',
'Google Io',
'Eminem',
];
 
	    Y.one("#searchWord").plug(Y.Plugin.AutoComplete,{
		resultFilters:'phraseMatch',
		resultHighlighter:'phraseMatch',
		source:words
	    });

            var startCalendar = new Y.Calendar({
                contentBox: "#startCalendar",
                width:'300px',
                showPrevMonth: false,
                showNextMonth: false,
                date: new Date()
            }).render();
            var endCalendar = new Y.Calendar({
                contentBox: "#endCalendar",
                width:'300px',
                showPrevMonth: false,
                showNextMonth: false,
                date: new Date()
            }).render();

            var startOverlay = new Y.Overlay({
                srcNode: "#startOverlay",
                width:"300px",
                height:"300px",
                headerContent: "choose start date",
                align:{
                    node: "#startDate",
                    points:[Y.WidgetPositionAlign.TL,Y.WidgetPositionAlign.BR]
                },
                zIndex:10,
                visible: false
            }).render();
            var endOverlay = new Y.Overlay({
                srcNode: "#endOverlay",
                width:"300px",
                height:"300px",
                headerContent: "choose end date",
                align:{
                    node: "#endDate",
                    points:[Y.WidgetPositionAlign.TL,Y.WidgetPositionAlign.BR]
                },
                zIndex:10,
                visible: false
            }).render();
            Y.on("click", Y.bind(startOverlay.show,startOverlay), "#startDate");
            Y.on("click", Y.bind(endOverlay.show, endOverlay), "#endDate");

            startCalendar.on("selectionChange", function (e) {
                var d = e.newSelection[0];
                console.log(d);
                var dtdate = Y.DataType.Date;
                Y.one("#startDate").set('value',dtdate.format(d));
                startOverlay.hide();
            });
            endCalendar.on("selectionChange", function (e) {
                var d = e.newSelection[0];
                console.log(d);
                var dtdate = Y.DataType.Date;
                Y.one("#endDate").set('value',dtdate.format(d));
                endOverlay.hide();

            });
	    node.one("#btn").on("click", function (e) {
                word=node.one("#searchWord").get('value');
                startDate=node.one("#startDate").get('value');
                endDate=node.one("#endDate").get('value');
	        var c=mp.getChildren();
		var id=c['yql'].viewId;
		console.log(word+startDate+endDate);
		mp.broadcast('broadcast-link', {word: word, startDate: startDate, endDate: endDate},{target:{viewId:id}});
		console.log("broadcast-link");
		
		clickActionSearch();
          });
	   node.one("#btn1").on("click", function (e) {
		display(1);
          });
	node.one("#btn2").on("click", function (e) {
		display(0);
          });
        }

    };

}, '0.0.1', {requires: ['tabview','autocomplete','autocomplete-filters','autocomplete-highlighters','d3','topojson','queue','calendar','datatype-date','stylesheet','overlay','slider', 'dd-plugin']});
