/**
 * 
 */

define(function(require, exports, module) {
	'use strict';
	
	var _ = require('underscore');
	var Layout = require('backbone.layout');
	var Event = require('models/event');
	
	module.exports = Layout.extend({
		className: 'container-fluid',
		
		template: require('template!calendar'),
		
		initialize: function() {
			this.collection = new Event.Collection();
			
			this.listenTo(this.collection, 'add', this.addEvent);
			this.listenTo(this.collection, 'destroy', this.destroyEvent);
			this.listenTo(this.collection, 'change', this.changeEvent);
		},
		
		afterRender: function() {
			var view = this;
			
			// to don't worry about function context
			_.bindAll(this, 'onRangeSelected', 'onEventClicked', 'onEventDroppped');
			
			require(['jquery', 'fullcalendar'], function($) {
				view.collection.add([
					{
						id: 1,
						title: 'Day Event',
						start: '2015-11-19 15:30',
					},
					{
						id: 2,
						title: 'Long day Event',
						start: '2015-11-24 16:45',
						end: '2015-11-26 20:00',
					},
				], {silent: true});
				
				// render the calendar
				view.$('#calendar').fullCalendar({
					header: {
						left: '',
						center: 'prev title next',
						right: 'today month,basicWeek,basicDay'
					},
					firstDay: 1,
					businessHours: true,
					editable: true,
					selectable: true,
					timeFormat: 'H(:mm)',
					
					// callbacks
					select: view.onRangeSelected,
					eventClick: view.onEventClicked,
					eventDrop: view.onEventDroppped,
					eventResize: view.onEventDroppped,
					
					// calendar events
					events: function(start, end, timezone, callback) {
						callback(view.collection.toJSON());
						/*view.collection.fetch({
							silent: true,
							data: {'start': start.unix(), 'end': end.unix(), 'timezone': timezone},
							success: function(collection) {
								callback(collection.toJSON());
							},
						});*/
					},
				});
				
				// use the fullCalendar instance directly
				view.calendar = view.$('#calendar').data('fullCalendar');
			});
		},
		
		addEvent: function(model) {
			this.calendar.renderEvent(model.toJSON());
		},
		
		destroyEvent: function(model) {
			this.calendar.removeEvents(model.id);
		},
		
		changeEvent: function(model) {
			var view = this;
			var events = this.calendar.clientEvents(model.id);
			
			_.each(events, function(fcEvent) {
				fcEvent.title = model.get('title');
				
				view.calendar.updateEvent(fcEvent);
			});
		},
		
		onRangeSelected: function(start, end) {
			var data = {
				'id': _.uniqueId(),
				'title': prompt("Enter the event title").trim(),
				'start': start,
				'end': end,
			};
			
			if ( _.isEmpty(data.title) ) return;
			
			this.collection.add(new Event.Model(data));
		},
		
		onEventClicked: function(fcEvent) {
			var model = this.collection.get(fcEvent.id);
			var title = prompt("Change the event title", fcEvent.title).trim();
			
			if ( _.isEmpty(title) ) return;
			
			model.set({'title': title});
		},
		
		onEventDroppped: function(fcEvent) {
			var model = this.collection.get(fcEvent.id);
			
			model.set({'start': fcEvent.start, 'end': fcEvent.end}, {silent: true});
		},
	});
});