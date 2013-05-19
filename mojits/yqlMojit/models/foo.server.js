/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('yqlMojitModelFoo', function(Y, NAME) {

/**
 * The yqlMojitModelFoo module.
 *
 * @module yqlMojit
 */

    /**
     * Constructor for the yqlMojitModelFoo class.
     *
     * @class yqlMojitModelFoo
     * @constructor
     */
    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        /**
         * Method that will be invoked by the mojit controller to obtain data.
         *
         * @param callback {function(err,data)} The callback function to call when the
         *        data has been retrieved.
         */
        getData: function(callback) {
            callback(null, { some: 'data' });
        }

    };

}, '0.0.1', {requires: []});
