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
            require(['app', 'views/desk'], function(app, Desk) {
                app.show(new Desk());
            });
        },
        
        goCalendar: function() {
            require(['app', 'views/calendar'], function(app, View) {
                app.show(new View());
            });
        },
        
        goLogin: function() {
            if ( this._isLogin === true ) {
                return;
            }
            
            this._isLogin = true;
            require(['views/common/login'], function(Login) {
                (new Login()).render();
            });
        },
        
        goTasks: function(id) {
            require([
                'app', 
                'views/tasks/tasks',
                'views/tasks/my-tasks',
            ], function(app, TasksView, MyTasksView) {
                app.show((id === null) ? new MyTasksView() : new TasksView());
            });
        },
        
        goOverview: function(id) {
            require(['app', 'views/projects/overview'], function(app, View) {
                app.show(new View());
            });
        },
        
        goTeam: function(id) {
            require(['app', 'views/projects/team'], function(app, View) {
                app.show(new View());
            });
        },
        
        goAccount: function() {
            require(['app', 'views/account'], function(app, View) {
                app.show(new View());
            });
        },
    });
    
    module.exports = new Router;
});