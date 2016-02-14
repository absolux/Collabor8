/**
 * 
 */
define(function() {
  'use strict';
  
  return {
    
    /**
     * 
     */
    set: function set(key, value) {
      sessionStorage.setItem(key, value);
    },
    
    /**
     * 
     */
    get: function get(key) {
      return sessionStorage.getItem(key);
    },
    
    /**
     * 
     */
    has: function has(key) {
      return this.get(key);
    },
    
    /**
     * 
     */
    flush: function flush() {
      sessionStorage.clear();
    }
    
  }
  
})