var _           = require('underscore'),
    Backbone    = require('backbone');

/**
 * helper to dispose objects
 */
var __dispose = function() {
	if ( this._disposed === true ) return;
	
	this.trigger('dispose', this);
	
	// clean up if the method exists
	if ( _.isFunction(this.cleanup) ) this.cleanup();
	
	this._disposed = true;
	
    if ( _.isFunction(Object.freeze) ) Object.freeze(this); 
};

/**
 * Helper to detach a view from DOM
 */
var __detachView = function(view, keep) {
	if (! view._attached ) return view;
	
	view.trigger('before:detach', view, keep);
	view.$el.detach();
	view._attached = false;
	view.trigger('after:detach', view, keep);
	
	return (!keep) ? __dispose.apply(view) : view;
};

/**
 * Helper to append a view to DOM
 */
var __attachView = function(view, $el, options) {
	options = options || {};
    options.method = options.method || 'append';
	
	view.trigger('before:attach', view, $el, options);
	$el[options.method](view.$el);
	view._attached = true;
	view.trigger('after:attach', view, $el, options);
	
	if ( options.render ) view.render();
	
	return view;
};

/**
 * Convert an element or selector to JQuery object
 */
var __to$el = function(el, parent) {
	var $ = Backbone.$;
	
	if ( parent ) {
		return el ? __to$el(parent).find(el) : __to$el(parent);
	}
	
	if ( el instanceof $ ) return el;
	
	if ( _.isView(el) ) return el.$el; 
	
	return $(el);
};

// extend underscore
_.mixin({
	
	// capitalize a word
	capitalize: function(str) {
		if (! _.isString(str) ) return null;
		
		if ( str.length > 1 ) {
			return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
		}
		else {
			return str.charAt(0).toUpperCase();
		}
	},
	
	// return true if the given argument is a Backbone view.
	isView: function(arg) {
		return arg.$el instanceof Backbone.$;
	},
	
});
