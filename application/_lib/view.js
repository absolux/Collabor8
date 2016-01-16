/**
 * 
 */
define(['require', 'backbone', 'underscore', './util'], 
function(require, Backbone, _) {
    'use strict';
    
    return Backbone.View.extend({
        
        /**
         * 
         */
        helpers: {},
        
        /**
         * Vue components
         */
        components: [],
        
        /**
         * 
         */
        render: function() {
            this._ensureNotDisposed();
            
            // If the before callback fails by returning `false`,
            // then do not proceed rendering.
            if ( this.beforeRender.apply(this, arguments) === false ) {
                return this;
            }
            
            this.trigger('before:render', this);			
            this._renderTemplate(this.templateOptions);
            this._rendered = true;
            this.trigger('after:render', this);
            
            // perform after render operations
            this.afterRender.apply(this, arguments);
            
            return this;
        },
        
        /**
         * 
         */
        serialize: function() {
            var data = {};
		
			if ( this.model ) 
				_.extend(data, this.model.toJSON());
		
			if ( this.collection ) 
				_.extend(data, {'items': this.collection.toJSON()});
		
			return data;
        },
        
        /**
         * 
         */
        beforeRender: _.noop,
        
        /**
         * 
         */
        afterRender: _.noop,
        
        /**
         * 
         */
        dispose: __dispose,
        
        /**
         * 
         */
        cleanup: function() {
            _.invoke(this.components, 'destroy');
            this.remove();
        },
        
        /**
         * append the view to a selector
         */
        appendTo: function(selector, options) {
			this._ensureNotDisposed();
		
			options = _.extend({'render': true}, options);
		
			return __attachView(this, __to$el(selector), options);
		},
        
        /**
         * 
         */
        detach: function(keep) { return __detachView(this, keep); },
        
        /**
         * 
         */
        _ensureNotDisposed: function() {
            if ( this._disposed === true ) {
                throw "Disposed view cannot be used any more !";
            }
        },
        
        /**
         * 
         */
        _renderTemplate: function(options) {
            if (! this.template ) return; // allow empty templates
            
            var helpers = _.result(this, 'helpers'),
                data = _.extend(this.serialize(), helpers);
            
            if ( _.isString(this.template) ) {
                // create a template function for the given HTML
                this.template = this._templateFunc(this.template, options);
            }
            
            if (! _.isFunction(this.template) ) {
                throw "A template function is required to render the view !";
            }
            
            this._setHTML(this.template(data));
        },
        
        /**
         * Override it to use another template function
         */
        _templateFunc: _.template,
        
        /**
         * 
         */
        _setHTML: function(html) {
			this.$el.html(html);
		},
        
        
    });
});