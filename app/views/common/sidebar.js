/**
 * 
 */

define(function(require, exports, module) {
    'use strict';
    
    var Marionette = require('backbone.marionette');
    var bs = require('bootstrap');
    
    var View = Marionette.CompositeView.extend({
        template: require('template!common/sidebar'),
        
        childViewContainer: "ul.projects",
        
        childView: require('./sidebar/projects-menu-item'),
        
        emptyView: require('./sidebar/no-projects-found'),
        
        ui: {
            createBtn:  '#create-project-btn',
            nameField:  '#project-name-field',
            descField:  '#project-desc-field',
            dialog:     '#add-project-dialog',
            searchForm: '.search-form',
            createForm: '.create-form',
        },
        
        events: {
            'click @ui.createBtn': 'onCreateFormSubmitted',
            'hidden.bs.modal @ui.dialog': 'resetCreateForm',
            'submit @ui.createForm': 'onCreateFormSubmitted',
        },
                        
        onCreateFormSubmitted: function(e) {
            e.preventDefault();
            var that = this,
                data = {
                    name: this.ui.nameField.val(),
                    desc: this.ui.descField.val()
            };
            
            this.ui.createBtn.attr('disabled', true);
            this.collection.create(data, {
                wait: true, 
                success: function() {
                    that.resetCreateForm();
                },
                error: function() {
                    require(['lib/ui/notifier'], function(notifier) {
                        notifier.show("Please, try again", "Error occured", "error");
                        that.ui.createBtn.attr('disabled', false);
                    });
                }
            });
        },
                        
        resetCreateForm: function() {
            this.ui.nameField.val("");
            this.ui.descField.val("");
            this.ui.dialog.modal('hide');
            this.ui.createBtn.attr('disabled', false);
        },
    });

    module.exports = View;
});