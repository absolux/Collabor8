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
            'projects': 'goProjects',
            'projects/:id': 'goOverview',
            'projects/:id/config': 'goConfig',
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
        
        goProjects: function() {
            require(['app', 'views/projects/list', 'models/project'], function(app, View, Project) {
                app.show(new View({collection: new Project.Collection()}));
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
                'models/project',
                'models/task',
            ], function(app, TasksView, MyTasksView, Project, Task) {
                if ( id === null ) {
                    var projects = new Project.Collection();
                    
                    projects.fetch().done(function() {
                        var tasks = new Backbone.Collection();
                        
                        app.show(new MyTasksView({collection: projects, 'tasks': tasks}));
                        tasks.fetch({url: "tasks/mine", reset: true});
                    });
                }
                else {
                    var project = Project.current(id);
                    
                    app.show(new TasksView({model: project}), {render: false});
                    project.fetch();
                }
            });
        },
        
        goOverview: function(id) {
            require(['app', 'views/projects/overview', 'models/project'], 
                    function(app, View, Project) {
                var project = Project.current(id);
                
                app.show(new View({model: project}), {render: false});
                project.fetch();
            });
        },
        
        goConfig: function(id) {
            require(['app', 'views/projects/settings', 'models/project'], 
                    function(app, View, Project) {
                var project = Project.current(id);
                
                project.fetch().done(function() {
                    app.show(new View({model: project}));
                });
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