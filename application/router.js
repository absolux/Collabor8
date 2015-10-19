/**
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var Backbone = require('backbone');
    
    var Router = Backbone.Router.extend({
        routes: {
            '': 'goHome',
            'calendar': 'goCalendar',
            'tasks(/:project)': 'goTasks',
            'projects/:id': 'goOverview',
            'projects/:id/team': 'goTeam',
            'account': 'goAccount',
        },
        
        execute: function(callback, args, name) {
            if (! window.isLogged ) {
                this.goLogin();
                return false;
            }
            
            this._isLogin = false;
            if ( callback ) callback.apply(this, args); 
        },
        
        goHome: function() {
            require(['views/layout', 'views/desk'], function(layout, Desk) {
                layout.show(new Desk());
            });
        },
        
        goCalendar: function() {
            require(['views/layout', 'views/calendar'], function(layout, View) {
                layout.show(new View());
            });
        },
        
        goLogin: function() {
            if ( this._isLogin === true ) {
                return;
            }
            
            this._isLogin = true;
            require(['views/login'], function(Login) {
                (new Login()).render();
            });
        },
        
        goTasks: function(id) {
            require([
                'views/layout', 
                'views/tasks/tasks',
                'views/tasks/my-tasks',
            ], function(layout, TasksView, MyTasksView) {
                layout.show((id === null) ? new MyTasksView() : new TasksView());
            });
        },
        
        goOverview: function(id) {
            require(['views/layout', 'views/projects/overview'], function(layout, View) {
                layout.show(new View());
            });
        },
        
        goTeam: function(id) {
            require(['views/layout', 'views/projects/team'], function(layout, View) {
                layout.show(new View());
            });
        },
        
        goAccount: function() {
            require(['views/layout', 'views/account'], function(layout, View) {
                layout.show(new View());
            });
        },
    });
    
    module.exports = new Router;
});