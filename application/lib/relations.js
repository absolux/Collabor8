/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	/** dependencies */
	var _ = require('underscore');
	
	/** a hash of all relations */
	var __rels = {};
	
	/** a set of reserved parameters used internally */
	var __reserved = ['key', 'otherKey', 'related'];
	
	/**
	 * create a new relation for the model
	 */
	function _createRelation(type, model, options) {
		var data = model.get(options.key);
		var opts = _.omit(options, __reserved)
		
		if ( type === 'Model' && !_.isObject(data) ) {
			data = {'id': data};
		} else if ( type === 'Collection' && !_.isArray(data) ) {
			data = [];
		}
		
		var rel = _setRelation(model, options.key, new options.related(data, opts));
		
		if ( options.otherKey ) {
			rel[options.otherKey] = model;
		}
		
		return rel;
	};
	
	/**
	 * set a relation by key
	 */
	function _setRelation(model, key, value) {
		if (! __rels[model.cid] ) {
			__rels[model.cid] = {};
		}
		
		return __rels[model.cid][key] = value;
	};
	
	/**
	 * return true if the model has a relation setted for this key
	 */
	function _hasRelation(model, key) {
		return __rels[model.cid] && __rels[model.cid][key];
	};
	
	/**
	 * return the related model or collection if defined, null otherwise
	 */
	function _getRelation(model, key) {
		return _hasRelation(model, key) ? __rels[model.cid][key] : null;
	}
	
	
	/**
	 * define and return the related model
	 */
	exports.belongsTo = function(options) {
		return _getRelation(this, options.key) || _createRelation('Model', this, options); 
	};
	
	/**
	 * define and return the related collection
	 */
	exports.hasMany = function(options) {
		return _getRelation(this, options.key) || _createRelation('Collection', this, options); 
	};
});