// app.js

new Vue({

  // We want to target the div with an id of 'events'
  el: '#events',

  // Here we can register any values or collections that hold data
  // for the application
  data: {
		event: { name: '', description: '', date: '' },
		events: [],
		update: false
	},

	// Anything within the ready function will run when the application loads
	ready: function() {
		// When the application loads, we want to call the method that initializes
		// some data
		this.fetchEvents();
	},

	// Methods we want to use in our application are registered here
	methods: {
		
		clearEvent: function(){
			this.event = { name: '', description: '', date: '' };
			this.update = false;
		},

		// We dedicate a method to retrieving and setting some data
		fetchEvents: function() {
			var events = [];
      // this.$set('events', events);
      this.$http.get('/api/events/')
        .then(function (events) {
          this.$set('events', events.data);
          console.log(events.data);
        },
				function (err) {
          console.log(err);
        });
		},

		// Adds or updates an event to the existing events array
		postEvent: function() {
			
			if (this.update) {
				
				this.update = true;
				if (this.event.name.trim()) {
					this.$http.put('/api/events/' + this.event.id, this.event)
						.then(function (res) {
							console.log(res);
							console.log('Event updated!');
							this.clearEvent();
							this.fetchEvents();
						},
						function (err) {
							console.log(err);
						});
				}
			}else{
				if (this.event.name.trim()) {
					this.$http.post('/api/events/', this.event)
						.then(function (res) {
							console.log(res);
							this.events.push(res.data);
							console.log('Event added!');
							this.event = { name: '', description: '', date: '' };
						},
						function (err) {
							console.log(err);
						});
				}
			}
		},
		
		updateEvent: function(index){
			this.update = true;
			this.event = JSON.parse(JSON.stringify(this.events[index]));
		},
		
		deleteEvent: function(index) {
			if(confirm("Are you sure you want to delete this event?")) {
				this.$http.delete('api/events/' + this.events[index].id)
          .then(function (res) {
            console.log(res);
            this.events.splice(index, 1);
						this.clearEvent();
						this.fetchEvents();
          },
					function (err) {
            console.log(err);
          });        
			}
		}
	}
});