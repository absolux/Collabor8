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
