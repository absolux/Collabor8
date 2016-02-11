/**
 * 
 */
define(['backbone', 'underscore', './util'],
function(Backbone, _) {
    'use strict';
    
    function def(obj, key, enumerable) {
        Object.defineProperty(obj, key, {
            enumerable: !!enumerable,
            configurable: true,
            set: function setter(value) {
                setFunc.call(this, key, value);
            },
            get: function getter() {
                return this.get(key);
            },
        });
    }
    
    var setFunc = Backbone.Model.prototype.set;
    
    return Backbone.Model.extend({
        
        /**
         * redefine `set` to support 
         */
        set: function(key, val, options) {
            if (key == null) return this;

            var data = {};
            
            if ( _.isObject(key) ) {
                data = key;
                options = val;
            } 
            else data[key] = val;

            options || (options = {});
            
            // delete unsetted attributes
            if ( options.unset === true ) {
                for (var attr in data) delete this[attr];
            }
            
            // define properties
            for ( var attr in data ) {
                if (! (attr === 'id' || attr === this.idAttribute || _.has(this, attr)) ) {
                    def(this, attr);
                }
            }
            
            return setFunc.apply(this, arguments);
        },
	
        /**
         * 
         */
        dispose: __dispose,
        
        /**
         * 
         */
        cleanup: function() {
            this.stopListening();
            this.clear({silent: true});
            
            if ( this.collection ) this.collection.remove(this);
        },
	   
    });
});