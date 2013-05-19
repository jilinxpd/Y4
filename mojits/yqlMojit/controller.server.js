/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('yqlMojit', function(Y, NAME) {

/**
 * The yqlMojit module.
 *
 * @module yqlMojit
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.namespace('mojito.controllers')[NAME] = {

        /**
         * Method corresponding to the 'index' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        index: function(ac) {
            ac.done();
        },

	show: function(ac) {
	    var path="./mojits/FormMojit/assets/test.tsv";
            var word=ac.params.getFromBody('word');
	    var startDate=ac.params.getFromBody('startDate');
	    var endDate=ac.params.getFromBody('endDate');
	    Y.log(ac.params);
            var model=ac.models.get('yqlMojitModel');
	    
	    Y.log("startDate: "+startDate);
	    
	    var sd=""+startDate.split('-')[2];
	    var ed=""+endDate.split('-')[2];
	    var fs=require("fs");
	    
	    var start=Y.Number.parse(sd);
	    var end=Y.Number.parse(ed);
            Y.log(start+"     "+end);
	    Y.log("word: "+word);
	    model.getData(word,12,22,function(data) {
                Y.log("getData is completed!");
            	fs.writeFile(path,data,function(err){
		   if(err) throw err;
		   Y.log('It is saved!');
		   
	     });
            });
	    
	    ac.done();
        }

    };

}, '0.0.1', {requires: ['datatype-number','mojito-params-addon', 'mojito-models-addon', 'yqlMojitModel']});
