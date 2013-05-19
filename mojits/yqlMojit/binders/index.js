/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('yqlMojitBinderIndex', function(Y, NAME) {

/**
 * The yqlMojitBinderIndex module.
 *
 * @module yqlMojitBinderIndex
 */

    /**
     * Constructor for the yqlMojitBinderIndex class.
     *
     * @class yqlMojitBinderIndex
     * @constructor
     */
    Y.namespace('mojito.binders')[NAME] = {

        /**
         * Binder initialization method, invoked after all binders on the page
         * have been constructed.
         */
        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
	    var self=this;
	    this.mojitProxy.listen('broadcast-link', function(payload){
		var word=payload.data.word;
		var startDate=payload.data.startDate;
		var endDate=payload.data.endDate;
		var params={
		   body:{
			 word: word,
			 startDate: startDate,
			 endDate: endDate
			}
		};
		Y.log("params: "+params);
		mojitProxy.invoke('show',{params: params}, function(err,markup){
		    self.node.setContent(markup);
		});
	    });
        },

        /**
         * The binder method, invoked to allow the mojit to attach DOM event
         * handlers.
         *
         * @param node {Node} The DOM node to which this mojit is attached.
         */
        bind: function(node) {
            var me = this;
            this.node = node;
            /**
             * Example code for the bind method:
             *
             * node.all('dt').on('mouseenter', function(evt) {
             *   var dd = '#dd_' + evt.target.get('text');
             *   me.node.one(dd).addClass('sel');
             *
             * });
             * node.all('dt').on('mouseleave', function(evt) {
             *   
             *   var dd = '#dd_' + evt.target.get('text');
             *   me.node.one(dd).removeClass('sel');
             *
             * });
             */
        }

    };

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client']});
