//file:lib/router.js
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'template404'
});

Router.map(function() {
    this.route('introduction', {
        path: '/'
    });
});

Router.map(function() {
    this.route('tutorials', {
        path: '/tutorials',
        waitOn: function() {
            return [Meteor.subscribe('tutorials'), Meteor.subscribe('registrations')];
        },
        data: function() {
            return {tutorials: Tutorials.find({}, {sort: {name: 1}}) };
        }
    });
});

Router.map(function() {
    this.route('createTutorial', {
        path: '/createTutorial',
        template: 'admin',
        data: function() {
            return new Tutorial();
        }
    });
});

Router.map(function() {
    this.route('modifyTutorial', {
        path: '/modifyTutorial/:_id',
        template: 'admin',
        waitOn: function() {
            return Meteor.subscribe('tutorial', this.params._id);
        },
        data: function() {
            return Tutorials.findOne();
        }
    });
});

Router.onBeforeAction('loading');

// security

var requireLogin = function(pause) {
    if (!Meteor.userId()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        }
        else {
            this.render('introduction');
        }
        pause();
    }
}

var requireAdmin = function(pause) {
    if (!Meteor.user() && Roles.userIsInRole(Meteor.userId(), ['admin'])) {
        if (Meteor.loggingIn())
            this.render(this.loadingTemplate);
        else this.render('introduction');
        pause();
    }
}

// add hooks
if (Meteor.isClient) {
    Router.onBeforeAction(requireLogin, {only: ['tutorials']});
    // Router.onBeforeAction(Security.requireTutor, {only: 'tutorPracticals'});
    Router.onBeforeAction(requireAdmin, {only: ['createPractical']});
}

