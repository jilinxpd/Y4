/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('FormMojit', function(Y, NAME) {

/**
 * The FormMojit module.
 *
 * @module FormMojit
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
	    ac.composite.done();
        }

    };

}, '0.0.1', {requires: ['mojito','mojito-composite-addon']});
